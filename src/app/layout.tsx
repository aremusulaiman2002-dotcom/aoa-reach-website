import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SanityLive } from '@/sanity/lib/live'
import ChatWidget from '@/components/chatbot/ChatWidget'
import { SITE_URL } from '@/lib/siteUrl'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08361d',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AOA Reach Charity Foundation — Nonprofit in Kwara State & Abuja, Nigeria',
    template: '%s | AOA Reach Charity Foundation',
  },
  description:
    'AOA Reach Charity Foundation is a registered Nigerian NGO (RN 8056929) transforming lives through education, healthcare, clean water, and community development in Kwara State and Abuja.',
  openGraph: {
    title: 'AOA Reach Charity Foundation — Nonprofit in Kwara State & Abuja, Nigeria',
    description:
      'Reaching Out, Touching Lives — AOA Reach is a registered Nigerian nonprofit delivering education, healthcare, and humanitarian aid across Kwara State and Abuja.',
    url: SITE_URL,
    siteName: 'AOA Reach Charity Foundation',
    images: [
      {
        // Replace with a dedicated 1200×630 OG banner when available
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation',
      },
    ],
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AOA Reach Charity Foundation — Nonprofit in Nigeria',
    description:
      'Transforming communities in Kwara State & Abuja through education, healthcare, and sustainable development.',
    images: [`${SITE_URL}/images/logo/aoa-reach-logo.png`],
  },
  keywords: [
    'AOA Reach Charity Foundation',
    'NGO Nigeria',
    'non-profit Kwara State',
    'charity Abuja Nigeria',
    'community development Nigeria',
    'humanitarian aid Nigeria',
    'education support Nigeria',
    'healthcare outreach Nigeria',
    'volunteer Nigeria',
    'donate Nigeria NGO',
  ],
  authors: [{ name: 'AOA Reach Charity Foundation', url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': `${SITE_URL}/#organization`,
  name: 'AOA Reach Charity Foundation',
  alternateName: 'AOA Reach',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
  },
  description:
    'Registered non-profit organization (RN 8056929) transforming lives through compassion, service, and sustainable community development in Kwara State and Abuja, Nigeria.',
  foundingDate: '2024',
  identifier: {
    '@type': 'PropertyValue',
    name: 'Nigerian NGO Registration Number',
    value: 'RN 8056929',
  },
  address: [
    {
      '@type': 'PostalAddress',
      addressRegion: 'Kwara State',
      addressCountry: 'NG',
    },
    {
      '@type': 'PostalAddress',
      addressRegion: 'FCT Abuja',
      addressCountry: 'NG',
    },
  ],
  // TODO: replace placeholders with verified profile URLs
  sameAs: [
    'https://www.facebook.com/aoareach',
    'https://twitter.com/aoareach',
    'https://www.instagram.com/aoareach',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'info@aoareach.org',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SanityLive />
        <ChatWidget />
        <div className="hidden fixed bottom-4 right-4 z-50">
          <a
            href="https://sulaiman-portfolio-sigma.vercel.app/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="bg-gradient-to-r from-[#08361d] to-emerald-800 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-emerald-600"
            aria-label="Visit developer portfolio (opens in new tab)"
          >
            <span>💚</span>
            <span>Developed by SulaimanDev</span>
          </a>
        </div>
      </body>
    </html>
  )
}
