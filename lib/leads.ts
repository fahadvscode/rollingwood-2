import { z } from "zod"

/** rollingwood_leads.buyer_type_check */
export const buyerTypeValues = [
  "first-time",
  "investor",
  "upgrader",
  "downsizer",
  "multigenerational",
] as const

/** rollingwood_leads.home_interest_check (Lakeview-style “project” picker) */
export const homeInterestValues = [
  "classic",
  "signature",
  "both",
  "not-sure",
] as const

export type BuyerType = (typeof buyerTypeValues)[number]
export type HomeInterest = (typeof homeInterestValues)[number]

function isBuyerType(v: string): v is BuyerType {
  return (buyerTypeValues as readonly string[]).includes(v)
}

function isHomeInterest(v: string): v is HomeInterest {
  return (homeInterestValues as readonly string[]).includes(v)
}

export function normalizeBuyerType(v: unknown): BuyerType {
  const s = String(v ?? "").trim()
  return isBuyerType(s) ? s : "first-time"
}

export function normalizeHomeInterest(v: unknown): HomeInterest {
  const s = String(v ?? "").trim()
  return isHomeInterest(s) ? s : "not-sure"
}

/** Same shape as Lakeview: core fields only + consent. */
export const leadRegistrationSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  home_interest: z.enum(homeInterestValues),
  buyer_type: z.enum(buyerTypeValues),
  consent: z
    .boolean()
    .optional()
    .default(true)
    .transform((v) => v !== false),
})

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>

export type RollingwoodLeadInsert = {
  first_name: string
  last_name: string
  email: string
  phone: string
  buyer_type: BuyerType
  home_interest: HomeInterest
  consent: boolean
  status: string
  lead_temperature: string
  lead_type: string
}

export function toRollingwoodLeadRow(input: LeadRegistrationInput): RollingwoodLeadInsert {
  return {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email.toLowerCase(),
    phone: input.phone,
    buyer_type: input.buyer_type,
    home_interest: input.home_interest,
    consent: input.consent,
    status: "new",
    lead_temperature: "warm",
    lead_type: "registration",
  }
}

export function parseLeadRegistrationBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return leadRegistrationSchema.safeParse(body)
  }

  const raw = body as Record<string, unknown>

  return leadRegistrationSchema.safeParse({
    first_name: raw.first_name ?? raw.firstName,
    last_name: raw.last_name ?? raw.lastName,
    email: raw.email,
    phone: raw.phone,
    home_interest: normalizeHomeInterest(
      raw.home_interest ?? raw.homeInterest ?? raw.project ?? raw.interestedIn
    ),
    buyer_type: normalizeBuyerType(raw.buyer_type ?? raw.buyerType),
    consent: raw.consent ?? true,
  })
}
