import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Volunteer, donate, or partner with AOA Reach Charity Foundation. Help transform lives in underserved communities across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Get Involved | AOA Reach Charity Foundation',
    description:
      'Volunteer, donate, or become a partner. Join AOA Reach in delivering education, healthcare, and humanitarian aid across Nigeria.',
    url: `${SITE_URL}/get-involved`,
    images: [
      {
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Get Involved with AOA Reach',
      },
    ],
  },
  twitter: {
    title: 'Volunteer or Donate — AOA Reach Charity Foundation',
    description:
      'Volunteer, donate, or partner with AOA Reach to transform communities in Kwara State and Abuja, Nigeria.',
  },
  alternates: {
    canonical: `${SITE_URL}/get-involved`,
  },
}

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return children
}
