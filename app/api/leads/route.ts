import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  buildLeadInsertAttempts,
  isSchemaMismatchInsertError,
  parseLeadRegistrationBody,
} from "@/lib/leads"
import { supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env"

const MAX_BODY_BYTES = 32_768

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl) {
      return NextResponse.json(
        { error: "Server misconfigured: missing Supabase URL." },
        { status: 503 }
      )
    }
    if (!supabaseServiceRoleKey && !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server misconfigured: missing Supabase API key." },
        { status: 503 }
      )
    }

    const contentType = request.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 })
    }

    const contentLength = request.headers.get("content-length")
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 })
    }

    const body = await request.json()
    const parsed = parseLeadRegistrationBody(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the form and try again.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const attempts = buildLeadInsertAttempts(parsed.data)

    let error: {
      code?: string | null
      message?: string | null
      details?: string | null
    } | null = null
    const attemptErrors: string[] = []

    for (const row of attempts) {
      const result = await supabase.from("rollingwood_leads").insert(row)
      error = result.error
      if (!error) {
        error = null
        break
      }
      attemptErrors.push(
        `${Object.keys(row).sort().join(",")}: ${error.code ?? "?"} ${error.message ?? ""}`
      )
      if (!isSchemaMismatchInsertError(error)) break
    }

    if (error) {
      console.error(
        "rollingwood_leads insert failed after",
        attempts.length,
        "attempts:",
        attemptErrors.join(" | ")
      )
      console.error("last error:", error.code, error.message, error.details)

      const msg = error.message?.toLowerCase() ?? ""
      let userMessage = "Failed to save registration. Please try again."

      if (
        error.code === "42703" ||
        error.code === "PGRST204" ||
        msg.includes("column") ||
        msg.includes("schema cache")
      ) {
        userMessage =
          "Registration is temporarily unavailable (database update required). Please try again later or contact support."
      } else if (error.code === "23514" || msg.includes("check constraint")) {
        userMessage = "Invalid form selection — please refresh and try again."
      } else if (error.code === "42501" || msg.includes("row-level security")) {
        userMessage =
          "Registration is temporarily unavailable (database permissions). Please contact support."
      } else if (msg.includes("notify_new_rollingwood") || msg.includes("trigger")) {
        userMessage =
          "Registration could not be completed (server notification error). Please try again later or contact support."
      }

      return NextResponse.json(
        {
          error: userMessage,
          code: error.code ?? "unknown",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("leads API:", err)
    const message = err instanceof Error ? err.message : "Unknown error"
    const isConfig =
      message.includes("Missing NEXT_PUBLIC_SUPABASE") ||
      message.includes("Missing SUPABASE")

    return NextResponse.json(
      {
        error: isConfig
          ? "Server misconfigured. Please contact support."
          : "Server error. Please try again.",
        ...(process.env.NODE_ENV === "development" && { debug: message }),
      },
      { status: isConfig ? 503 : 500 }
    )
  }
}
