import type { Metadata } from 'next'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Join AOA Reach as a volunteer, donor, or partner. Help transform lives in underserved communities across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Get Involved | AOA Reach Charity Foundation',
    description: 'Volunteer, donate, partner, or provide in-kind support. Join AOA Reach in transforming communities across Nigeria.',
    url: `${baseUrl}/get-involved`,
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Get Involved with AOA Reach',
      },
    ],
  },
  twitter: {
    title: 'Get Involved | AOA Reach Charity Foundation',
    description: 'Volunteer, donate, or partner with AOA Reach to transform lives in Nigeria.',
  },
  alternates: {
    canonical: `${baseUrl}/get-involved`,
  },
}

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return children
}
