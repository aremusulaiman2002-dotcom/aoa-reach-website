import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageField } from '@/sanity/types'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-sans text-gray-700 leading-relaxed text-lg mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-elegant text-3xl font-bold text-gray-900 mt-12 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-elegant text-2xl font-bold text-gray-900 mt-10 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-elegant text-xl font-semibold text-gray-900 mt-8 mb-2 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#08361d] pl-6 py-2 my-8 bg-emerald-50 rounded-r-xl">
        <p className="font-elegant text-xl italic text-[#08361d] leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-2 font-sans text-gray-700 text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 font-sans text-gray-700 text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm bg-gray-100 text-[#08361d] px-1.5 py-0.5 rounded border border-gray-200">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const isExternal = href.startsWith('http') || href.startsWith('mailto')
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-[#08361d] underline underline-offset-2 hover:text-emerald-700 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: SanityImageField & { caption?: string } }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 font-sans mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
