"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { images } from "@/lib/images"

const navigation: { name: string; href: string; highlight?: boolean }[] = [
  { name: "Home", href: "/" },
  { name: "Floor Plans", href: "/floor-plans" },
  { name: "Location", href: "/location" },
  { name: "Neighbourhood", href: "/neighbourhood" },
  { name: "FAQ", href: "/faq" },
  { name: "Register", href: "/register", highlight: true },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-card/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center py-2">
            <Image
              src={images.logo}
              alt="Rollingwood Townhomes Brampton"
              width={180}
              height={50}
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.highlight
                    ? "font-sans text-sm font-semibold text-secondary px-4 py-2 rounded-full hover:bg-secondary/10 transition-colors"
                    : "font-sans text-sm font-medium text-muted-foreground px-4 py-2 rounded-full hover:text-primary hover:bg-muted transition-colors"
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center">
            <Button asChild className="btn-pill bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans text-sm h-11 px-6 shadow-md shadow-secondary/20">
              <Link href="/register">Get price list</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-5 border-t border-border">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    item.highlight
                      ? "font-sans text-base font-semibold text-secondary px-4 py-3 rounded-xl bg-secondary/10"
                      : "font-sans text-base font-medium text-foreground px-4 py-3 rounded-xl hover:bg-muted"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="btn-pill bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans w-full mt-4 h-12 text-base">
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Get price list — Register
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
