import { useQuery } from 'react-query'
import { queryReleaseType } from '../api'

export function useReleaseTypesQuery() {
  return useQuery(['releaseType'], () => queryReleaseType())
}
