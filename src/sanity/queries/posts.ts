import { groq } from 'next-sanity'

const postSummaryFragment = groq`
  _id,
  title,
  "slug": slug.current,
  mainImage { asset, hotspot, crop, alt },
  excerpt,
  publishedAt,
  "estimatedReadingTime": round(length(pt::text(body)) / 1000),
  "categories": categories[]-> { title, "slug": slug.current },
  "author": author-> { name, "slug": slug.current }
`

export const filteredPostsQuery = groq`
  *[_type == "post" && (
    $search == "" || title match $search || excerpt match $search || pt::text(body) match $search
  ) && (
    $category == "" || $category in categories[]->slug.current
  )] | order(publishedAt desc) [0...30] {
    ${postSummaryFragment}
  }
`

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...30] {
    ${postSummaryFragment}
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage { asset, hotspot, crop, alt },
    excerpt,
    body,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 1000),
    "categories": categories[]-> { title, "slug": slug.current },
    "author": author-> {
      name,
      "slug": slug.current,
      image { asset, alt },
      bio
    },
    seo
  }
`

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    ${postSummaryFragment}
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }
`
