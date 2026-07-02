import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AOA Reach Charity Foundation — a registered Nigerian NGO (RN 8056929) on a mission to uplift underserved communities in Kwara State and Abuja through compassion, integrity, and sustainable development.',
  openGraph: {
    title: 'About Us | AOA Reach Charity Foundation',
    description:
      'Our mission, story, and the values that drive AOA Reach — a registered Nigerian nonprofit transforming lives in Kwara State and Abuja.',
    url: `${SITE_URL}/about`,
    images: [
      {
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation',
      },
    ],
  },
  twitter: {
    title: 'About AOA Reach Charity Foundation',
    description:
      'Registered Nigerian NGO (RN 8056929) transforming lives in Kwara State and Abuja through compassion and community development.',
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
