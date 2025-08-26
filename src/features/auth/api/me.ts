import API from '../../../lib/api'
import { ApiResponse, User } from '../../../types'

export const getMe = (): Promise<ApiResponse<User>> => {
  return API.get('/auth/profile')
}
