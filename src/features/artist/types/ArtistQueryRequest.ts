import { QueryRequest } from '../../../types'
import { Artist } from '.'

export interface ArtistQueryRequest extends QueryRequest, Partial<Artist> {
  isActive?: boolean
}
