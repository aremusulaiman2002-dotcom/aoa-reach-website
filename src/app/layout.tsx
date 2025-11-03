// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Inter, Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AOA Reach Charity Foundation - Reaching out, Touching lives',
  description: 'A registered non-profit organization committed to transforming lives through compassion, service, and sustainable community development across Kwara State and Abuja.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#08361d" />
        <meta name="author" content="Sulaiman Aremu" />
        <meta name="developer" content="Sulaiman Aremu" />
        <link rel="author" href="https://sulaiman-portfolio-sigma.vercel.app/" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="AOA Reach Charity Foundation - Reaching out, Touching lives" />
        <meta property="og:description" content="Transforming lives through compassion, service, and sustainable community development across Kwara State and Abuja." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AOA Reach Charity Foundation" />
        <meta name="twitter:description" content="Reaching out, Touching lives - Sustainable community development in Nigeria" />
      </head>
      <body className="font-sans antialiased bg-white">
        {children}
        
        {/* Developer Credit - Subtle but visible */}
        <div className="fixed bottom-4 right-4 z-50">
          <a 
            href="https://sulaiman-portfolio-sigma.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#08361d] to-emerald-800 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-emerald-600"
          >
            <span>💚</span>
            <span>Developed by SulaimanDev</span>
          </a>
        </div>
      </body>
    </html>
  )
}