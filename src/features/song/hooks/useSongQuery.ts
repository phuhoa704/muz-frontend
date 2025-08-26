import { useQuery } from 'react-query'
import { SongQueryRequest } from '../types/SongQuery'
import { querySong } from '../api'

export function useSongQuery(query: SongQueryRequest = {}) {
  return useQuery(['song', JSON.stringify(query)], () => querySong(query))
}
