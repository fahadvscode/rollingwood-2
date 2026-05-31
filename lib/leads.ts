import { z } from "zod"

/** Matches public.rollingwood_leads buyer_type_check */
export const buyerTypeValues = [
  "first-time",
  "investor",
  "upgrader",
  "downsizer",
  "multigenerational",
] as const

/** Matches public.rollingwood_leads home_interest_check */
export const homeInterestValues = [
  "classic",
  "signature",
  "both",
  "not-sure",
] as const

/** Stored in purchase_timeframe (text, no DB enum — keep stable values) */
export const timeframeValues = [
  "asap",
  "3-6-months",
  "6-12-months",
  "just-exploring",
] as const

const emptyToUndefined = (val: unknown) =>
  val === "" || val === null || val === undefined ? undefined : val

export const leadRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z.preprocess(
    emptyToUndefined,
    z.string().trim().min(7, "Phone must be at least 7 characters").max(30).optional()
  ),
  buyerType: z.enum(buyerTypeValues, {
    errorMap: () => ({ message: "Please select a buyer type" }),
  }),
  homeInterest: z.enum(homeInterestValues, {
    errorMap: () => ({ message: "Please select a collection" }),
  }),
  purchaseTimeframe: z.preprocess(
    emptyToUndefined,
    z.enum(timeframeValues).optional()
  ),
  agentName: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(200).optional()
  ),
  brokerage: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(200).optional()
  ),
  comments: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(5000).optional()
  ),
  consent: z
    .boolean()
    .optional()
    .default(true)
    .transform((v) => v !== false),
})

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>

/** Columns we insert — matches rollingwood_leads (defaults handle the rest). */
export type RollingwoodLeadInsert = {
  first_name: string
  last_name: string
  email: string
  phone: string | null
  buyer_type: (typeof buyerTypeValues)[number]
  home_interest: (typeof homeInterestValues)[number]
  purchase_timeframe: string | null
  agent_name: string | null
  brokerage: string | null
  comments: string | null
  consent: boolean
}

export function toRollingwoodLeadRow(
  input: LeadRegistrationInput
): RollingwoodLeadInsert {
  return {
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email.toLowerCase(),
    phone: input.phone ?? null,
    buyer_type: input.buyerType,
    home_interest: input.homeInterest,
    purchase_timeframe: input.purchaseTimeframe ?? null,
    agent_name: input.agentName ?? null,
    brokerage: input.brokerage ?? null,
    comments: input.comments ?? null,
    consent: input.consent,
  }
}

/** Normalize client JSON (supports legacy/alternate keys). */
export function parseLeadRegistrationBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return leadRegistrationSchema.safeParse(body)
  }

  const raw = body as Record<string, unknown>

  return leadRegistrationSchema.safeParse({
    firstName: raw.firstName ?? raw.first_name,
    lastName: raw.lastName ?? raw.last_name,
    email: raw.email,
    phone: raw.phone,
    buyerType: raw.buyerType ?? raw.buyer_type ?? "first-time",
    homeInterest:
      raw.homeInterest ?? raw.home_interest ?? raw.interestedIn ?? "not-sure",
    purchaseTimeframe:
      raw.purchaseTimeframe ?? raw.purchase_timeframe ?? raw.timeframe,
    agentName: raw.agentName ?? raw.agent_name,
    brokerage: raw.brokerage,
    comments: raw.comments,
    consent: raw.consent ?? true,
  })
}
