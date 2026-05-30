import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { leadRegistrationSchema, toRollingwoodLeadRow } from "@/lib/leads"

const MAX_BODY_BYTES = 32_768

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 })
    }

    const contentLength = request.headers.get("content-length")
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 })
    }

    const body = await request.json()
    const parsed = leadRegistrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const row = toRollingwoodLeadRow(parsed.data)

    // Do not .select() after insert — anon role has insert-only RLS, not select.
    const { error } = await supabase.from("rollingwood_leads").insert(row)

    if (error) {
      console.error("rollingwood_leads insert:", error)
      return NextResponse.json(
        { error: "Failed to save registration. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("leads API:", err)
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    )
  }
}
