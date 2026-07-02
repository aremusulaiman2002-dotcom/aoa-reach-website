import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/siteUrl'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'News, stories, and updates from AOA Reach Charity Foundation — programme insights, community impact stories, and the lives we are transforming across Kwara State and Abuja, Nigeria.',
  openGraph: {
    title: 'Blog | AOA Reach Charity Foundation',
    description:
      'Stories, news, and updates from AOA Reach — community impact and humanitarian outreach across Nigeria.',
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
        width: 1200,
        height: 630,
        alt: 'AOA Reach Charity Foundation Blog',
      },
    ],
  },
  twitter: {
    title: 'AOA Reach Blog — Stories from the Field',
    description:
      'Community impact stories, programme updates, and news from AOA Reach across Nigeria.',
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
