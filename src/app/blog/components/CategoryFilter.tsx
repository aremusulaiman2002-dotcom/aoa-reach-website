'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Category } from '@/sanity/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildHref = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    // Preserve search param
    const qs = params.toString()
    return `${pathname}${qs ? `?${qs}` : ''}`
  }

  const pillBase =
    'px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-200 whitespace-nowrap border'
  const active = 'bg-[#08361d] text-white border-[#08361d] shadow-sm'
  const inactive =
    'bg-white text-gray-700 border-gray-200 hover:border-[#08361d] hover:text-[#08361d]'

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href={buildHref(null)}
        className={`${pillBase} ${!activeCategory ? active : inactive}`}
        scroll={false}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={buildHref(cat.slug)}
          className={`${pillBase} ${activeCategory === cat.slug ? active : inactive}`}
          scroll={false}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  )
}
