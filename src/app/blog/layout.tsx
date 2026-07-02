import type { Metadata } from 'next'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, stories, and updates from AOA Reach Charity Foundation — insights on our programs, community impact, and the lives we are transforming across Nigeria.',
  openGraph: {
    title: 'Blog | AOA Reach Charity Foundation',
    description: 'News, stories, and updates from AOA Reach — community impact across Nigeria.',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: `${baseUrl}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation Blog',
      },
    ],
  },
  twitter: {
    title: 'Blog | AOA Reach Charity Foundation',
    description: 'News, stories, and updates from AOA Reach across Nigeria.',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
