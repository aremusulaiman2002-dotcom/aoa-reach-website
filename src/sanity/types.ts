import type { PortableTextBlock } from '@portabletext/react'

export type SanityImageField = {
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export type Category = {
  _id?: string
  title: string
  slug: string
  description?: string | null
}

export type Author = {
  name: string
  slug?: string | null
  image?: SanityImageField | null
  bio?: string | null
}

export type PostSummary = {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageField | null
  excerpt?: string | null
  publishedAt: string
  estimatedReadingTime?: number | null
  categories?: Category[] | null
  author?: Pick<Author, 'name' | 'slug'> | null
}

export type Post = PostSummary & {
  body?: PortableTextBlock[] | null
  author?: Author | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
}

export type PostSlugEntry = {
  slug: string
  publishedAt: string
}
