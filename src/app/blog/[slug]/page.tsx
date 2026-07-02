import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Users } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '../components/PostCard'
import { portableTextComponents } from '../components/PortableTextComponents'
import { sanityFetch } from '@/sanity/lib/live'
import { postBySlugQuery, allPostSlugsQuery, relatedPostsQuery } from '@/sanity/queries/posts'
import { urlFor } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/siteUrl'
import type { Post, PostSummary, PostSlugEntry } from '@/sanity/types'

// ─── Static params ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({ query: allPostSlugsQuery })
    return ((data as PostSlugEntry[] | null) ?? []).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: postBySlugQuery, params: { slug } })
  const post = data as Post | null

  if (!post) return {}

  const title = post.seo?.metaTitle ?? post.title
  const description = post.seo?.metaDescription ?? post.excerpt ?? ''
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : `${SITE_URL}/images/logo/aoa-reach-logo.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.mainImage?.alt ?? title }],
    },
    twitter: { title, description, images: [ogImage] },
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [{ data: rawPost }, { data: rawRelated }] = await Promise.all([
    sanityFetch({ query: postBySlugQuery, params: { slug } }),
    sanityFetch({ query: relatedPostsQuery, params: { slug } }),
  ])

  const post = rawPost as Post | null
  const relatedPosts = rawRelated as PostSummary[] | null

  if (!post) notFound()

  const heroImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(800).fit('crop').url()
    : null

  const ogImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : `${SITE_URL}/images/logo/aoa-reach-logo.png`

  const authorName = post.author?.name ?? 'AOA Reach Charity Foundation'
  const authorBio =
    post.author?.bio ??
    'AOA Reach Charity Foundation is dedicated to uplifting underserved communities through education, healthcare access, and sustainable livelihood programmes. Every story we share reflects the resilience and spirit of the people we serve.'

  const authorImageUrl =
    post.author?.image?.asset
      ? urlFor(post.author.image).width(160).height(160).fit('crop').url()
      : null

  // ── BlogPosting structured data ──────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? '',
    image: ogImageUrl,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'AOA Reach Charity Foundation',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/aoa-reach-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Full-bleed hero */}
      <div className="relative w-full pt-16 md:pt-20">
        {heroImageUrl ? (
          <div className="relative w-full h-[50vh] md:h-[65vh] max-h-[680px] overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Category pills overlaid on image */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 md:max-w-3xl md:w-full flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog?category=${cat.slug}`}
                    className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100" />
        )}
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Title card — pulls up over hero */}
          <div className="-mt-16 relative z-10 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 mb-10">
            <h1 className="font-elegant text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-sans text-lg text-gray-600 leading-relaxed border-l-4 border-[#08361d]/40 pl-5 mb-6 italic">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm font-sans">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#08361d]" />
                <span className="font-medium text-gray-700">{authorName}</span>
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {post.estimatedReadingTime != null && post.estimatedReadingTime > 0 && (
                <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.estimatedReadingTime} min read
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          {post.body && (
            <div className="prose-like pb-10">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Topic tags */}
          {post.categories && post.categories.length > 0 && (
            <div className="border-t border-gray-100 pt-8 pb-6">
              <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog?category=${cat.slug}`}
                    className="inline-block bg-[#08361d]/10 text-[#08361d] text-sm font-medium px-4 py-1.5 rounded-full hover:bg-[#08361d]/20 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author / Foundation bio */}
          <div className="border-t border-gray-100 pt-10 pb-6">
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="shrink-0">
                {authorImageUrl ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#08361d]/20">
                    <Image
                      src={authorImageUrl}
                      alt={authorName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#08361d] flex items-center justify-center ring-2 ring-[#08361d]/20">
                    <span className="font-elegant text-white text-2xl font-bold">
                      {authorName[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-sans text-xs font-semibold text-[#08361d] uppercase tracking-wider mb-1">
                  Written by
                </p>
                <p className="font-elegant text-lg font-bold text-gray-900 mb-2">{authorName}</p>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">{authorBio}</p>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="py-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#08361d] font-semibold font-sans hover:text-emerald-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-elegant text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                More from AOA Reach
              </h2>
              <p className="font-sans text-gray-500 mb-10">
                Continue reading our latest stories and updates.
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((p, i) => (
                  <PostCard key={p._id} post={p} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
