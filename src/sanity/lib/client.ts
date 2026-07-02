import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  // Fallback to 'placeholder' so createClient doesn't throw at module init
  // when env vars aren't set. API calls will fail at request time instead.
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: '/studio',
  },
})
