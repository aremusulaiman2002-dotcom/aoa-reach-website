import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const baseUrl = 'https://aoa-reach-website.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch post slugs directly via client (sitemap is not a React component)
  let postEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "post" && defined(slug.current)] { "slug": slug.current, publishedAt }`
    )
    postEntries = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // If Sanity is not yet configured, return static routes only
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ]
}
