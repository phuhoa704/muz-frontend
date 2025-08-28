import API from '@/lib/api'
import { ApiResponse } from '@/types'
import { Release } from '../types'
import { ReleaseType } from '../types'
import { ReleaseQueryRequest } from '../types/ReleaseQuery'

export const queryRelease = (
  params?: ReleaseQueryRequest
): Promise<ApiResponse<Release[]>> => {
  return API.get('/release', params)
}

export const queryReleaseType = (): Promise<ApiResponse<ReleaseType[]>> => {
  return API.get('/release/types')
}
