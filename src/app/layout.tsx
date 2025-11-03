import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AOA Reach - Reaching out, Touching lives',
  description: 'A registered Nigerian Non-Governmental Organization dedicated to creating positive change and uplifting the lives of those in need across Africa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body bg-background">
        {children}
      </body>
    </html>
  )
}