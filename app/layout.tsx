import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { images } from '@/lib/images'
import { siteUrl } from '@/lib/site'
import { RegisterCtaBar } from '@/components/register-cta-bar'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '28x28' },
      { url: '/icon.png', sizes: '28x28', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  title: 'Rollingwood Townhomes Brampton | New Freehold Townhomes by Regency Property',
  description:
    'Rollingwood Townhomes Brampton — 118 new pre-construction freehold townhomes by Regency Property at 150 Rollingwood Drive. Six models from the $600,000s. Classic 3-storey and Signature 4-storey collections. Occupancy 2027–2028.',
  keywords: [
    'Rollingwood Townhomes Brampton',
    'Rollingwood Drive townhomes',
    "Fletcher's Creek South Brampton townhomes",
    'pre-construction townhomes Brampton',
    'Regency Property Brampton',
    'freehold townhomes Brampton',
    'new townhomes Brampton 2027',
    'Rollingwood Townhomes',
  ],
  authors: [{ name: 'Rollingwood Townhomes Brampton' }],
  creator: 'Rollingwood Townhomes Brampton',
  publisher: 'Rollingwood Townhomes Brampton',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: 'Rollingwood Townhomes Brampton',
    title: 'Rollingwood Townhomes Brampton | New Freehold Townhomes by Regency Property',
    description:
      'Pre-construction freehold townhomes at 150 Rollingwood Drive, Brampton. 118 homes, 6 floor plans from the $600,000s. Register for pricing and floor plans.',
    images: [
      {
        url: images.og,
        width: 1200,
        height: 630,
        alt: 'Rollingwood Townhomes Brampton — freehold townhomes by Regency Property',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rollingwood Townhomes Brampton | Freehold Townhomes from $600,000s',
    description:
      '118 freehold townhomes at 150 Rollingwood Drive, Brampton. Classic & Signature collections. Occupancy 2027–2028.',
    images: [images.og],
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    'geo.region': 'CA-ON',
    'geo.placename': 'Brampton',
    'geo.position': '43.6663;-79.7375',
    ICBM: '43.6663, -79.7375',
  },
}

export const viewport: Viewport = {
  themeColor: '#c45c3e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateDevelopment',
  name: 'Rollingwood Townhomes Brampton',
  alternateName: ['Rollingwood Townhomes', 'Rolling Woods Townhomes'],
  description:
    '118 new pre-construction freehold townhomes by Regency Property at 150 Rollingwood Drive, Brampton. Six models from the $600,000s across Classic 3-storey and Signature 4-storey collections.',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '150 Rollingwood Drive',
    addressLocality: 'Brampton',
    addressRegion: 'ON',
    postalCode: 'L6Y 5J6',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.6663,
    longitude: -79.7375,
  },
  developer: {
    '@type': 'Organization',
    name: 'Regency Property',
    alternateName: ['Regency Development', 'Regency Developments'],
  },
  numberOfUnits: 118,
  propertyType: 'Townhouse',
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: '600000',
      priceCurrency: 'CAD',
      valueAddedTaxIncluded: false,
    },
    availability: 'https://schema.org/PreOrder',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Rollingwood Townhomes Brampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rollingwood Townhomes is a new pre-construction freehold townhouse community by Regency Property at 150 Rollingwood Drive in Brampton. The project includes 118 townhomes in Classic and Signature collections, from the $600,000s, with occupancy in 2027–2028.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are Rollingwood Townhomes located in Brampton?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '150 Rollingwood Drive, Fletcher\'s Creek South, Brampton, ON L6Y 5J6 — near Mavis Road and Ray Lawson Boulevard, with Highway 407 approximately 5 minutes away.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do Rollingwood Townhomes in Brampton start at?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing begins in the $600,000s. Register on this site for current floor plans, pricing updates, and availability.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${fraunces.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
        <RegisterCtaBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
