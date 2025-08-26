import { useQuery } from 'react-query'
import { AuthStorage } from '../utils'
import { getMe } from '../api/me'

export function useGetMe() {
  const isAuthenticated: boolean = !!AuthStorage.getAccessToken()

  return useQuery(
    'me',
    async () => {
      const { data } = await getMe()
      console.log('get me data: ', data)
      return data
    },
    {
      enabled: isAuthenticated,
      onError: () => {
        AuthStorage.clearAuthData()
      },
    }
  )
}
