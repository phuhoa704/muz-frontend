import { useAuth } from '../../../hooks/auth'
import { useNavigate } from 'react-router-dom'
import { loginWithEmailAndPassword } from '../api/login'
import { LoginRequest } from '../types'
import { AuthStorage } from '../utils'
import { useMutation } from '../../../lib/react-query'

export function useLoginWithEmailAndPassword() {
  const auth = useAuth()
  const navigate = useNavigate()

  const mutateFn = async (data: LoginRequest) => {
    return await loginWithEmailAndPassword(data)
  }

  return useMutation(mutateFn, {
    onSuccess: ({ data }) => {
      if (data.profile) {
        AuthStorage.saveAuthData(data)
        auth.login(data.profile)
        navigate('/')
      }
    },
  })
}
