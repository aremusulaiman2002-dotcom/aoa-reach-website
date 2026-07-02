import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'See what AOA Reach has achieved — 3,500+ students supported, 10,000+ individuals and families reached, and growing across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Our Impact | AOA Reach Charity Foundation',
    description:
      '3,500+ students supported, 10,000+ lives touched. Real impact from AOA Reach programs across Kwara State and Abuja, Nigeria.',
    url: `${SITE_URL}/impact`,
    images: [
      {
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Impact',
      },
    ],
  },
  twitter: {
    title: 'AOA Reach Impact — 10,000+ Lives Changed',
    description:
      '3,500+ students supported, 10,000+ individuals and families reached across Nigeria.',
  },
  alternates: {
    canonical: `${SITE_URL}/impact`,
  },
}

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children
}
