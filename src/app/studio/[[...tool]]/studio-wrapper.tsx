'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Studio with ssr: false so its module (which calls
// React.createContext at init time) is never evaluated on the server during build.
const Studio = dynamic(() => import('./studio-client'), { ssr: false })

export default function StudioWrapper() {
  return <Studio />
}
