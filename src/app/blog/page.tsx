import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from './components/PostCard'
import BlogSearch from './components/BlogSearch'
import CategoryFilter from './components/CategoryFilter'
import { sanityFetch } from '@/sanity/lib/live'
import { filteredPostsQuery, allPostsQuery, allCategoriesQuery } from '@/sanity/queries/posts'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary, Category } from '@/sanity/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const { search, category } = await searchParams

  const isFiltered = !!(search || category)
  const searchFormatted = search ? `*${search.trim()}*` : ''

  const [{ data: rawPosts }, { data: rawCategories }] = await Promise.all([
    isFiltered
      ? sanityFetch({
          query: filteredPostsQuery,
          params: { search: searchFormatted, category: category ?? '' },
        })
      : sanityFetch({ query: allPostsQuery }),
    sanityFetch({ query: allCategoriesQuery }),
  ])

  const posts = rawPosts as PostSummary[] | null
  const categories = rawCategories as Category[] | null

  const featuredPost = !isFiltered && posts?.[0] ? posts[0] : null
  const gridPosts = !isFiltered && posts ? posts.slice(1) : (posts ?? [])

  const featuredImageUrl = featuredPost?.mainImage
    ? urlFor(featuredPost.mainImage).width(1200).height(600).fit('crop').url()
    : null

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute top-32 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-sm mb-6">
              <div className="w-2 h-2 bg-[#08361d] rounded-full animate-pulse" />
              <span className="text-gray-700 text-sm font-medium font-sans">AOA Reach Stories</span>
            </div>

            <h1 className="font-elegant text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-[#08361d] to-gray-900 bg-clip-text text-transparent mb-4">
              Our Blog
            </h1>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              News, stories, and updates from the heart of our work — the communities we serve and the lives we are helping to transform.
            </p>
          </div>

          {/* Search */}
          <Suspense fallback={
            <div className="w-full max-w-2xl mx-auto h-14 bg-white/60 rounded-2xl border border-gray-200 animate-pulse" />
          }>
            <BlogSearch />
          </Suspense>

          {/* Category filter */}
          {categories && categories.length > 0 && (
            <div className="mt-6">
              <Suspense fallback={
                <div className="flex gap-2 justify-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-9 w-24 bg-white/60 rounded-full border border-gray-200 animate-pulse" />
                  ))}
                </div>
              }>
                <CategoryFilter categories={categories} activeCategory={category ?? ''} />
              </Suspense>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* Results header when filtered */}
          {isFiltered && (
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
              <p className="font-sans text-gray-600 text-sm">
                {posts?.length ?? 0} result{posts?.length !== 1 ? 's' : ''}
                {search ? ` for "${search}"` : ''}
                {category ? ` in "${categories?.find(c => c.slug === category)?.title ?? category}"` : ''}
              </p>
              <Link
                href="/blog"
                className="font-sans text-sm text-[#08361d] hover:underline"
              >
                Clear filters
              </Link>
            </div>
          )}

          {posts && posts.length > 0 ? (
            <div className="max-w-7xl mx-auto space-y-16">

              {/* Featured post */}
              {featuredPost && featuredImageUrl && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image side */}
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
                      <Image
                        src={featuredImageUrl}
                        alt={featuredPost.mainImage?.alt ?? featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Text side */}
                    <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.categories?.map((cat) => (
                          <span
                            key={cat.slug}
                            className="inline-block bg-[#08361d]/10 text-[#08361d] text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {cat.title}
                          </span>
                        ))}
                        <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>

                      <h2 className="font-elegant text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-[#08361d] transition-colors">
                        {featuredPost.title}
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="font-sans text-gray-600 leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-gray-400 text-sm font-sans mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={featuredPost.publishedAt}>
                            {formatDate(featuredPost.publishedAt)}
                          </time>
                        </span>
                        {featuredPost.estimatedReadingTime && (
                          <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {featuredPost.estimatedReadingTime} min read
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[#08361d] font-semibold font-sans">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {gridPosts.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post, index) => (
                    <PostCard key={post._id} post={post} index={index} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="max-w-md mx-auto text-center py-24">
              <div className="w-20 h-20 bg-[#08361d]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-[#08361d]/40" />
              </div>
              <h2 className="font-elegant text-2xl font-bold text-gray-900 mb-3">
                {isFiltered ? 'No posts found' : 'No posts yet'}
              </h2>
              <p className="font-sans text-gray-500 leading-relaxed mb-6">
                {isFiltered
                  ? 'Try a different search term or clear the filters.'
                  : 'We are working on our first stories. Check back soon — exciting updates are coming.'}
              </p>
              {isFiltered && (
                <Link href="/blog" className="btn-primary inline-block">
                  Clear filters
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
