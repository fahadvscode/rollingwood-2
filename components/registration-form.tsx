"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const inputClass =
  "h-12 text-base font-sans bg-background touch-manipulation"

const realtorOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

type RegistrationFormProps = {
  variant?: "quick" | "full"
  id?: string
  className?: string
  onSuccess?: () => void
}

async function submitLead(data: FormData) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      phone: data.get("phone"),
      is_realtor: data.get("is_realtor"),
      consent: true,
    }),
  })

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}))
    throw new Error(
      typeof payload.error === "string"
        ? payload.error
        : "Registration failed. Please try again."
    )
  }
}

function RadioCards({
  name,
  legend,
  options,
  columns = 2,
}: {
  name: string
  legend: string
  options: { value: string; label: string }[]
  columns?: 1 | 2
}) {
  return (
    <fieldset>
      <legend className="font-sans text-sm font-medium text-foreground mb-3">
        {legend}
        <span className="text-destructive ml-0.5">*</span>
      </legend>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-3 transition-colors",
              "has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2",
              "has-[:checked]:border-secondary has-[:checked]:bg-secondary/10"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="h-5 w-5 shrink-0 accent-primary"
            />
            <span className="font-sans text-sm font-medium text-foreground">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function RegistrationForm({
  variant = "full",
  id = "registration-form",
  className,
  onSuccess,
}: RegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await submitLead(new FormData(e.currentTarget))
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const isQuick = variant === "quick"

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn("space-y-5", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${id}-first_name`} className="font-sans text-sm font-medium">
            First name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${id}-first_name`}
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="Jane"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-last_name`} className="font-sans text-sm font-medium">
            Last name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${id}-last_name`}
            name="last_name"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Smith"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${id}-email`} className="font-sans text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={`${id}-phone`} className="font-sans text-sm font-medium">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="(416) 555-0123"
          />
        </div>
      </div>

      <RadioCards
        name="is_realtor"
        legend="Are you a realtor?"
        options={realtorOptions}
        columns={2}
      />

      {error && (
        <p
          role="alert"
          className="font-sans text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3"
        >
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full h-14 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            {isQuick ? "Get floor plans & pricing" : "Submit registration"}
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </>
        )}
      </Button>
    </form>
  )
}
