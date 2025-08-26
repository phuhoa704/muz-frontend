import { Artist } from '../../artist/types'
import { ReleaseType } from './ReleaseType'

export interface Release {
  id: number
  name: string
  description: string
  image: string
  releaseType: ReleaseType
  artist: Artist
  created_at: Date | string
  updated_at: Date | string
}
