import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | Rollingwood Townhomes Brampton — Floor Plans & Pricing',
  description:
    'Register for Rollingwood Townhomes Brampton updates: floor plans for all six models, pricing from the $600,000s, and early access at 150 Rollingwood Drive by Regency Property.',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
