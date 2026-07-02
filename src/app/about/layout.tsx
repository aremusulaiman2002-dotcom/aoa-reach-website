import type { Metadata } from 'next'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AOA Reach Charity Foundation — a registered NGO (RN 8056929) transforming lives in Kwara State and Abuja through compassion, integrity, and sustainable community development.',
  openGraph: {
    title: 'About Us | AOA Reach Charity Foundation',
    description: 'Learn about AOA Reach Charity Foundation — a registered NGO transforming lives in Kwara State and Abuja, Nigeria.',
    url: `${baseUrl}/about`,
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation',
      },
    ],
  },
  twitter: {
    title: 'About Us | AOA Reach Charity Foundation',
    description: 'Learn about AOA Reach Charity Foundation — a registered NGO transforming lives in Nigeria.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
