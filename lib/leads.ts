import { z } from "zod"

/** DB: rollingwood_leads_buyer_type_check */
export const buyerTypeValues = [
  "first-time",
  "investor",
  "upgrader",
  "downsizer",
  "multigenerational",
] as const

/** DB: rollingwood_leads_home_interest_check */
export const homeInterestValues = [
  "classic",
  "signature",
  "both",
  "not-sure",
] as const

export const timeframeValues = [
  "asap",
  "3-6-months",
  "6-12-months",
  "just-exploring",
] as const

export type BuyerType = (typeof buyerTypeValues)[number]
export type HomeInterest = (typeof homeInterestValues)[number]
export type Timeframe = (typeof timeframeValues)[number]

const emptyToUndefined = (val: unknown) =>
  val === "" || val === null || val === undefined ? undefined : val

function isBuyerType(v: string): v is BuyerType {
  return (buyerTypeValues as readonly string[]).includes(v)
}

function isHomeInterest(v: string): v is HomeInterest {
  return (homeInterestValues as readonly string[]).includes(v)
}

function isTimeframe(v: string): v is Timeframe {
  return (timeframeValues as readonly string[]).includes(v)
}

/** Normalize to a value allowed by DB check constraints. */
export function normalizeBuyerType(v: unknown): BuyerType {
  const s = String(v ?? "").trim()
  return isBuyerType(s) ? s : "first-time"
}

export function normalizeHomeInterest(v: unknown): HomeInterest {
  const s = String(v ?? "").trim()
  return isHomeInterest(s) ? s : "not-sure"
}

export function normalizeTimeframe(v: unknown): Timeframe | null {
  const s = String(v ?? "").trim()
  if (!s) return null
  return isTimeframe(s) ? s : null
}

export const leadRegistrationSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.preprocess(emptyToUndefined, z.string().trim().min(7).max(30).optional()),
  buyer_type: z.enum(buyerTypeValues),
  home_interest: z.enum(homeInterestValues),
  purchase_timeframe: z.preprocess(emptyToUndefined, z.enum(timeframeValues).optional()),
  agent_name: z.preprocess(emptyToUndefined, z.string().trim().max(200).optional()),
  brokerage: z.preprocess(emptyToUndefined, z.string().trim().max(200).optional()),
  comments: z.preprocess(emptyToUndefined, z.string().trim().max(5000).optional()),
  consent: z
    .boolean()
    .optional()
    .default(true)
    .transform((v) => v !== false),
})

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>

/** Exact columns for rollingwood_leads INSERT (matches your Supabase schema). */
export type RollingwoodLeadInsert = {
  first_name: string
  last_name: string
  email: string
  phone: string | null
  buyer_type: BuyerType
  home_interest: HomeInterest
  purchase_timeframe: string | null
  agent_name: string | null
  brokerage: string | null
  comments: string | null
  consent: boolean
  lead_type: string
  status: string
  lead_temperature: string
}

export function toRollingwoodLeadRow(input: LeadRegistrationInput): RollingwoodLeadInsert {
  return {
    first_name: input.first_name.trim(),
    last_name: input.last_name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() ?? null,
    buyer_type: input.buyer_type,
    home_interest: input.home_interest,
    purchase_timeframe: input.purchase_timeframe ?? null,
    agent_name: input.agent_name?.trim() ?? null,
    brokerage: input.brokerage?.trim() ?? null,
    comments: input.comments?.trim() ?? null,
    consent: input.consent,
    lead_type: "registration",
    status: "new",
    lead_temperature: "warm",
  }
}

/** Accept camelCase or snake_case from the browser form. */
export function parseLeadRegistrationBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return leadRegistrationSchema.safeParse(body)
  }

  const raw = body as Record<string, unknown>

  const buyer_type = normalizeBuyerType(
    raw.buyer_type ?? raw.buyerType ?? "first-time"
  )
  const home_interest = normalizeHomeInterest(
    raw.home_interest ?? raw.homeInterest ?? raw.interestedIn ?? "not-sure"
  )
  const purchase_timeframe = normalizeTimeframe(
    raw.purchase_timeframe ?? raw.purchaseTimeframe ?? raw.timeframe
  )

  return leadRegistrationSchema.safeParse({
    first_name: raw.first_name ?? raw.firstName,
    last_name: raw.last_name ?? raw.lastName,
    email: raw.email,
    phone: raw.phone,
    buyer_type,
    home_interest,
    purchase_timeframe: purchase_timeframe ?? undefined,
    agent_name: raw.agent_name ?? raw.agentName,
    brokerage: raw.brokerage,
    comments: raw.comments,
    consent: raw.consent ?? true,
  })
}
