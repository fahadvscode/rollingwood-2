"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RegisterCtaBar() {
  const pathname = usePathname()

  if (pathname === "/register") {
    return null
  }

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t-2 border-secondary/40 bg-primary text-primary-foreground pb-[env(safe-area-inset-bottom)] md:hidden"
      role="region"
      aria-label="Register for pricing"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <p className="font-sans text-xs text-primary-foreground/85 leading-tight flex-1 min-w-0">
          <span className="font-semibold text-primary-foreground block">Rollingwood Townhomes Brampton</span>
          From the $600,000s · Register for pricing
        </p>
        <Button
          asChild
          size="lg"
          className="shrink-0 h-12 px-5 rounded-md bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans text-sm"
        >
          <Link href="/register">
            Register
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  )
}
