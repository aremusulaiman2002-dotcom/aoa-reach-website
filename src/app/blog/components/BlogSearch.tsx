'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

const SUGGESTIONS = ['Donations', 'Volunteering', 'Programmes', 'Impact', 'Community']

export default function BlogSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('search', value.trim())
      } else {
        params.delete('search')
      }
      // Reset to page 1 when search changes
      const qs = params.toString()
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
    }, 300)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleSuggestion = (s: string) => {
    setValue(s)
  }

  const clear = () => setValue('')

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search blog posts"
          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 font-sans text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#08361d]/30 focus:border-[#08361d] transition-all"
        />
        {value && (
          <button
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!value && (
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          <span className="text-xs text-gray-400 font-sans self-center">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 font-sans hover:border-[#08361d] hover:text-[#08361d] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
