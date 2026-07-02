import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { PostSummary } from '@/sanity/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function PostCard({ post, index = 0 }: { post: PostSummary; index?: number }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).fit('crop').url()
    : null
  const readingTime = post.estimatedReadingTime ?? 1

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#08361d]/10 rounded-full flex items-center justify-center">
              <span className="text-[#08361d] font-elegant font-bold text-2xl">A</span>
            </div>
          </div>
        )}

        {/* Category badges */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {post.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.slug}
                className="inline-flex bg-[#08361d] text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 text-gray-400 text-xs font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
        </div>

        <h2 className="font-elegant text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#08361d] transition-colors line-clamp-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="font-sans text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="font-sans text-xs text-gray-400">
            {post.author?.name ?? 'AOA Reach'}
          </span>
          <span className="flex items-center gap-1 text-[#08361d] text-sm font-semibold">
            Read more
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
