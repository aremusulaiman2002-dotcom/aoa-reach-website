import type { Metadata, Viewport } from 'next'
import StudioWrapper from './studio-wrapper'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: { index: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function StudioPage() {
  return <StudioWrapper />
}
