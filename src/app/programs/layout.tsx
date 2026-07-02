import type { Metadata } from 'next'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Explore AOA Reach programs in education support, healthcare outreach, clean water access, food relief, women empowerment, and disability support across Kwara State and Abuja.',
  openGraph: {
    title: 'Our Programs | AOA Reach Charity Foundation',
    description: 'Education, healthcare, clean water, food relief, empowerment, and disability support programs across Nigeria.',
    url: `${baseUrl}/programs`,
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Programs',
      },
    ],
  },
  twitter: {
    title: 'Our Programs | AOA Reach Charity Foundation',
    description: 'Education, healthcare, clean water, food relief, empowerment and more — AOA Reach programs across Nigeria.',
  },
  alternates: {
    canonical: `${baseUrl}/programs`,
  },
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children
}
