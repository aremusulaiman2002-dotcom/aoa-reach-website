import type { Metadata } from 'next'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'Our Impact',
  description: 'See the measurable impact of AOA Reach — 3,500+ students supported, 10,000+ individuals and families reached, and growing across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Our Impact | AOA Reach Charity Foundation',
    description: '3,500+ students supported, 10,000+ individuals reached. Real impact, real lives changed across Nigeria.',
    url: `${baseUrl}/impact`,
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Impact Statistics',
      },
    ],
  },
  twitter: {
    title: 'Our Impact | AOA Reach Charity Foundation',
    description: '3,500+ students supported, 10,000+ individuals reached across Nigeria.',
  },
  alternates: {
    canonical: `${baseUrl}/impact`,
  },
}

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children
}
