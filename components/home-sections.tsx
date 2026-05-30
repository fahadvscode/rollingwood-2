import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Building2, Ruler, Home, Calendar, DollarSign, Users, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { images } from "@/lib/images"

export function HeroSection() {
  const stats = [
    { label: "From", value: "$600,000s" },
    { label: "Homes", value: "118" },
    { label: "Sq Ft", value: "1,325–1,971" },
    { label: "Move-in", value: "2027–28" },
  ]

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-muted">
      <div className="absolute inset-0">
        <Image
          src={images.home.banner}
          alt="Rollingwood Townhomes Brampton exterior rendering at 150 Rollingwood Drive"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-28 pb-8 text-center">
        <span className="section-label inline-block mb-6 rounded-full bg-card/90 px-5 py-2 shadow-sm backdrop-blur">
          Pre-Construction · Brampton
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-semibold text-primary leading-[1.05] mb-5 text-balance">
          Rollingwood Townhomes Brampton
        </h1>

        <p className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed">
          Freehold 3- & 4-storey townhomes at 150 Rollingwood Drive by Regency Property
        </p>
        <p className="font-sans text-sm sm:text-base text-muted-foreground/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Six models across Classic & Signature collections · Fletcher&apos;s Creek South · Turner Fleischer Architects
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button asChild size="lg" className="btn-pill bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 px-10 text-base shadow-lg shadow-secondary/25">
            <Link href="/#register">
              Get Floor Plans & Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="btn-pill border-primary/20 bg-card/80 h-14 px-10 text-base hover:bg-card">
            <Link href="/floor-plans">Explore Floor Plans</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card border border-border px-5 py-4 min-w-[7rem] shadow-md"
            >
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-accent mb-1">{stat.label}</p>
              <p className="font-serif text-xl font-semibold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative bg-secondary py-3.5">
        <p className="font-sans text-center text-sm font-semibold text-secondary-foreground tracking-wide">
          New HST Savings Available — Register for Platinum Access
        </p>
      </div>
    </section>
  )
}

export function FactsGrid() {
  const facts = [
    { label: "Address", value: "150 Rollingwood Drive, Brampton, ON L6Y 5J6", icon: MapPin },
    { label: "Builder", value: "Regency Property", icon: Building2 },
    { label: "Architect", value: "Turner Fleischer Architects Inc.", icon: Users },
    { label: "Total Units", value: "118 across 10 blocks", icon: Home },
    { label: "Storeys", value: "3-storey (Classic) and 4-storey (Signature)", icon: Building2 },
    { label: "Unit Sizes", value: "1,325 – 1,971 sq ft across 6 models", icon: Ruler },
    { label: "Bedrooms", value: "3 bedrooms (Classic) · 4–5 bedrooms (Signature)", icon: Home },
    { label: "Models", value: "Haven · Laguna A · Laguna B · Crown A · Crown B · Everwood", icon: Home },
    { label: "Starting Price", value: "From the $600,000s", icon: DollarSign },
    { label: "Status", value: "Pre-construction / Platinum Registration", icon: Calendar },
    { label: "Estimated Occupancy", value: "2027 – 2028", icon: Calendar },
    { label: "Major Intersection", value: "Mavis Road & Ray Lawson Boulevard", icon: MapPin },
    { label: "Neighbourhood", value: "Fletcher's Creek South, Brampton", icon: Leaf },
    { label: "Tenure", value: "Freehold", icon: Home },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Project Overview</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-primary">
            At a Glance
          </h2>
        </div>

        {/* Definition paragraph for GEO */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="font-serif text-lg text-foreground leading-relaxed">
            Rollingwood Townhomes (officially branded &ldquo;Rolling Woods Townhomes&rdquo; by the builder) is a new pre-construction townhouse community by Regency Property at 150 Rollingwood Drive, at Mavis Road and Highway 407 in the Fletcher&apos;s Creek South neighbourhood of Brampton, Ontario. Designed by Turner Fleischer Architects for multigenerational and growing families, the community offers freehold townhomes across 10 blocks in two collections: the 3-storey Classic Collection (Haven, Laguna B, Crown B — 1,325 to 1,403 sq ft, 3 bedrooms) and the 4-storey Signature Collection (Everwood, Laguna A, Crown A — 1,861 to 1,971 sq ft, 4 to 5 bedrooms). Starting prices begin in the $600,000s with estimated occupancy in 2027 to 2028.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {facts.map((fact) => (
            <div key={fact.label} className="section-card p-5">
              <div className="flex items-start gap-3">
                <fact.icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                    {fact.label}
                  </p>
                  <p className="font-serif text-base text-foreground font-medium">
                    {fact.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyRollingwood() {
  const reasons = [
    {
      title: "Freehold Ownership, Not Condo",
      description: "You own the home and the land beneath it — no monthly condo fees, no shared elevators or hallways. For Brampton families this is the path to building equity faster than a condo with $0.50–$0.70/sq ft maintenance fees.",
    },
    {
      title: "Two Collections to Fit Any Household",
      description: "The 3-storey Classic Collection (Laguna B, Haven, Crown B at 1,325–1,403 sq ft) suits first-time buyers and small families; the 4-storey Signature Collection (Laguna A, Everwood, Crown A at 1,861–1,971 sq ft, up to 5 bedrooms) suits multigenerational households, investors, and live-work professionals.",
    },
    {
      title: "Mavis & Highway 407 Corridor",
      description: "The site sits at Mavis Road and Highway 407, one of the GTA's most active growth corridors connecting Brampton to Mississauga and Vaughan. Strong commuter rental demand and long-term appreciation potential.",
    },
    {
      title: "Sheridan College Davis Campus 3 Minutes Away",
      description: "Built-in student rental demand if you're an investor; built-in education option if you're a family. The campus is approximately 1.6 km from the site.",
    },
    {
      title: "Turner Fleischer Architects Design",
      description: "One of Ontario's most established firms with 250+ residential projects, known for liveable, market-tested floor plans that resell well.",
    },
    {
      title: "Pre-Construction Pricing Advantage",
      description: "Locking in today's price for 2027–2028 delivery means buying 18–24 months of forecast Brampton appreciation up front, with a structured deposit schedule rather than full cash at signing.",
    },
  ]

  return (
    <section className="py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div className="relative aspect-[4/5] lg:sticky lg:top-24 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-card">
            <Image
              src={images.home.one}
              alt="Rollingwood Townhomes community rendering"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="section-label">Why Choose</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-primary mb-10">
              6 Reasons to Consider Rollingwood
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={reason.title} className="group section-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-3xl font-bold text-secondary/40 group-hover:text-secondary transition-colors tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-primary mb-3">
                        {reason.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CollectionsPreview() {
  const collections = [
    {
      name: "Classic Collection",
      storeys: "3-Storey",
      sqft: "1,325 – 1,403 sq ft",
      beds: "3 Bedrooms",
      models: ["Haven", "Laguna B", "Crown B"],
      description: "Perfect for first-time buyers, young families, and investors. Efficient layouts with modern finishes.",
      image: images.home.seven,
    },
    {
      name: "Signature Collection",
      storeys: "4-Storey",
      sqft: "1,861 – 1,971 sq ft",
      beds: "4–5 Bedrooms",
      models: ["Everwood", "Laguna A", "Crown A"],
      description: "Designed for multigenerational families, larger households, and those who need extra space for home offices.",
      image: images.home.eight,
    },
  ]

  return (
    <section className="py-24 bg-accent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label text-accent-foreground/80">Two Collections</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-accent-foreground">
            Find Your Perfect Fit
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div key={collection.name} className="overflow-hidden rounded-3xl bg-card shadow-xl ring-1 ring-black/5">
              {/* Collection image */}
              <div className="relative aspect-[16/10]">
                <Image
                  src={collection.image}
                  alt={`${collection.name} townhome rendering`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <span className="section-label">{collection.storeys}</span>
                  <h3 className="text-2xl font-serif font-semibold text-primary mt-2">
                    {collection.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">Size Range</p>
                    <p className="font-serif text-lg text-primary font-semibold">{collection.sqft}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">Bedrooms</p>
                    <p className="font-serif text-lg text-primary font-semibold">{collection.beds}</p>
                  </div>
                </div>

                <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed">
                  {collection.description}
                </p>

                <div className="mb-6">
                  <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">Models</p>
                  <div className="flex flex-wrap gap-2">
                    {collection.models.map((model) => (
                      <span key={model} className="font-sans text-sm text-accent-foreground bg-accent/15 px-3 py-1.5 rounded-full">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="btn-pill bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans w-full h-12">
                  <Link href="/floor-plans">
                    View Floor Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LocationPreview() {
  const destinations = [
    { name: "Sheridan College Davis Campus", time: "3 min", distance: "1.6 km" },
    { name: "Highway 407 on-ramp", time: "5 min", distance: "3 km" },
    { name: "Brampton Mall", time: "10 min", distance: "6 km" },
    { name: "Meadowvale GO Station", time: "10 min", distance: "7 km" },
    { name: "Highway 401 on-ramp", time: "10 min", distance: "9 km" },
    { name: "Toronto Pearson Airport", time: "18 min", distance: "15 km" },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[4/3] order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={images.home.two}
              alt="Rollingwood neighbourhood and community"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="section-label">Prime Location</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-primary mb-6">
              Connected to Everything
            </h2>
            <p className="font-serif text-lg text-foreground leading-relaxed mb-8">
              150 Rollingwood Drive sits at the southwestern edge of Brampton, just inside the Mavis Road and Ray Lawson Boulevard intersection. Highway 407 is approximately 5 minutes away and Highway 401 is approximately 10 minutes south, making this one of the most commute-friendly addresses in southwest Brampton.
            </p>
            
            <div className="section-card p-6 mb-6">
              <h3 className="font-sans text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6">
                Drive Times from Rollingwood
              </h3>
              <div className="space-y-4">
                {destinations.map((dest) => (
                  <div key={dest.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="font-serif text-base text-foreground">{dest.name}</span>
                    <div className="text-right">
                      <span className="font-sans text-sm font-semibold text-primary">{dest.time}</span>
                      <span className="font-sans text-xs text-muted-foreground ml-2">({dest.distance})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button asChild className="btn-pill bg-primary hover:bg-primary/90 text-primary-foreground font-sans h-12 px-8">
              <Link href="/location">
                View Full Location Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#c45c3e_0%,_transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-sans text-[0.7rem] font-bold tracking-[0.28em] uppercase text-secondary">
          Get Started
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-primary-foreground mb-6">
          Register for Platinum Access
        </h2>
        <p className="font-sans text-lg text-primary-foreground/75 mb-10 max-w-2xl mx-auto leading-relaxed">
          Be the first to receive floor plans, pricing, and exclusive updates about Rollingwood Townhomes. Platinum registrants get priority selection on available units.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="btn-pill bg-secondary hover:bg-secondary/90 text-secondary-foreground font-sans text-base px-10 h-14 shadow-lg">
            <Link href="/#register">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="btn-pill border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-sans text-base px-10 h-14">
            <Link href="/faq">Read FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
