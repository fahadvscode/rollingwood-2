import { z } from "zod"

export const realtorAnswerValues = ["yes", "no"] as const
export type RealtorAnswer = (typeof realtorAnswerValues)[number]

function isRealtorAnswer(v: string): v is RealtorAnswer {
  return (realtorAnswerValues as readonly string[]).includes(v)
}

export function parseIsRealtorFromForm(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v
  const s = String(v ?? "").trim().toLowerCase()
  if (s === "yes" || s === "true" || s === "1") return true
  if (s === "no" || s === "false" || s === "0") return false
  if (isRealtorAnswer(s)) return s === "yes"
  return undefined
}

export const leadRegistrationSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  is_realtor: z
    .union([z.boolean(), z.enum(realtorAnswerValues)])
    .transform((v) => v === true || v === "yes"),
  consent: z
    .boolean()
    .optional()
    .default(true)
    .transform((v) => v !== false),
})

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>

type LeadCore = {
  first_name: string
  last_name: string
  email: string
  phone: string
  consent: boolean
}

/** Rows to try in order until one matches the live Supabase schema. */
export function buildLeadInsertAttempts(
  input: LeadRegistrationInput
): Record<string, string | boolean>[] {
  const core: LeadCore = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    consent: input.consent,
  }

  const realtorNote = input.is_realtor ? "Realtor: Yes" : "Realtor: No"

  return [
    { ...core, is_realtor: input.is_realtor },
    {
      ...core,
      buyer_type: "first-time",
      home_interest: "not-sure",
      comments: realtorNote,
    },
    {
      ...core,
      is_realtor: input.is_realtor,
      buyer_type: "first-time",
      home_interest: "not-sure",
    },
  ]
}

export function isSchemaMismatchInsertError(error: {
  code?: string | null
  message?: string | null
}): boolean {
  const code = error.code ?? ""
  const msg = (error.message ?? "").toLowerCase()
  if (code === "23502") {
    return /buyer_type|home_interest|is_realtor/.test(msg)
  }

  return (
    code === "42703" ||
    code === "PGRST204" ||
    msg.includes("column") ||
    msg.includes("schema cache")
  )
}

export function parseLeadRegistrationBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return leadRegistrationSchema.safeParse(body)
  }

  const raw = body as Record<string, unknown>
  const isRealtor = parseIsRealtorFromForm(
    raw.is_realtor ?? raw.isRealtor ?? raw.realtor
  )

  return leadRegistrationSchema.safeParse({
    first_name: raw.first_name ?? raw.firstName,
    last_name: raw.last_name ?? raw.lastName,
    email: raw.email,
    phone: raw.phone,
    is_realtor: isRealtor ?? raw.is_realtor ?? raw.isRealtor ?? raw.realtor,
    consent: raw.consent ?? true,
  })
}
