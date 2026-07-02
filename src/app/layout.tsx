import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SanityLive } from '@/sanity/lib/live'
import ChatWidget from '@/components/chatbot/ChatWidget'
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

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08361d',
}

export const metadata: Metadata = {
  title: {
    default: 'AOA Reach Charity Foundation | Reaching Out, Touching Lives',
    template: '%s | AOA Reach Charity Foundation',
  },
  description: 'Registered non-profit organization transforming lives through compassion, service, and sustainable community development in Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'AOA Reach Charity Foundation',
    description: 'Reaching Out, Touching Lives — Transforming communities in Nigeria.',
    url: baseUrl,
    siteName: 'AOA Reach Charity Foundation',
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation Logo',
      },
    ],
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AOA Reach Charity Foundation',
    description: 'Making a difference through sustainable community development in Nigeria.',
    images: [`${baseUrl}/images/logo/aoa-reach-logo.png`],
  },
  keywords: [
    'AOA Reach Charity Foundation',
    'non-profit Nigeria',
    'charity organization Kwara State',
    'community development Abuja',
    'humanitarian aid Nigeria',
    'education support Nigeria',
    'healthcare outreach Nigeria',
  ],
  authors: [{ name: 'AOA Reach Charity Foundation' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
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
  name: 'AOA Reach Charity Foundation',
  alternateName: 'AOA Reach',
  url: baseUrl,
  logo: `${baseUrl}/images/logo/aoa-reach-logo.png`,
  description:
    'Registered non-profit organization transforming lives through compassion, service, and sustainable community development in Kwara State and Abuja, Nigeria.',
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
  sameAs: [
    'https://www.facebook.com/aoareach',
    'https://twitter.com/aoareach',
    'https://www.instagram.com/aoareach',
  ],
  foundingDate: '2024',
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
