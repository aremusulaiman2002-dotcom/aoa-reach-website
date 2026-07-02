import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    'AOA Reach programs span education support, healthcare outreach, clean water access, food relief, women empowerment, and disability support — serving communities across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Our Programs | AOA Reach Charity Foundation',
    description:
      'Education, healthcare, clean water, food relief, women empowerment, and disability support — AOA Reach programs across Kwara State and Abuja.',
    url: `${SITE_URL}/programs`,
    images: [
      {
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Programs',
      },
    ],
  },
  twitter: {
    title: 'AOA Reach Programs — Education, Healthcare & More',
    description:
      'Humanitarian outreach, education, healthcare, clean water, and empowerment programs across Nigeria.',
  },
  alternates: {
    canonical: `${SITE_URL}/programs`,
  },
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children
}
