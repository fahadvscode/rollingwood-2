import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { parseLeadRegistrationBody, toRollingwoodLeadRow } from "@/lib/leads"
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
    const row = toRollingwoodLeadRow(parsed.data)

    const { error } = await supabase.from("rollingwood_leads").insert(row)

    if (error) {
      console.error("rollingwood_leads insert:", error.code, error.message, error.details)

      const isCheckViolation =
        error.code === "23514" ||
        error.message?.toLowerCase().includes("check constraint")

      return NextResponse.json(
        {
          error: isCheckViolation
            ? "Invalid selection — please refresh and submit again."
            : "Failed to save registration. Please try again.",
          ...(process.env.NODE_ENV === "development" && {
            debug: { code: error.code, message: error.message },
          }),
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
