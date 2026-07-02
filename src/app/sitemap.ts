import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SITE_URL } from '@/lib/siteUrl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "post" && defined(slug.current)] { "slug": slug.current, publishedAt }`
    )
    postEntries = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // Sanity not yet configured — return static routes only
  }

  return [
    { url: SITE_URL,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
    { url: `${SITE_URL}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/programs`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/impact`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/get-involved`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/blog`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    ...postEntries,
  ]
}
