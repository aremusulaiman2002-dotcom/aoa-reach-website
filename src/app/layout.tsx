// app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'AOA Reach Charity Foundation | Reaching Out, Touching Lives',
  description: 'Registered non-profit organization transforming lives through compassion, service, and sustainable community development in Kwara State and Abuja, Nigeria.',
  
  // Open Graph
  openGraph: {
    title: 'AOA Reach Charity Foundation',
    description: 'Reaching Out, Touching Lives - Transforming communities in Nigeria',
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
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'AOA Reach Charity Foundation',
    description: 'Making a difference through sustainable community development',
    images: [`${baseUrl}/images/logo/aoa-reach-logo.png`],
  },
  
  // Additional SEO
  keywords: [
    'AOA Reach Charity Foundation',
    'non-profit Nigeria',
    'charity organization Kwara State',
    'community development Abuja',
    'humanitarian aid Nigeria',
    'education support Nigeria',
    'healthcare outreach Nigeria'
  ],
  authors: [{ name: 'AOA Reach Charity Foundation' }],
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(baseUrl),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#08361d" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Developer Credit */}
        <meta name="author" content="Sulaiman Aremu" />
        <link rel="author" href="https://sulaiman-portfolio-sigma.vercel.app/" />
      </head>
      <body className="font-sans antialiased bg-white">
        {children}
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Developer Credit */}
        <div className="fixed bottom-4 right-4 z-50">
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