import { Spin } from '../../../components/ui/spin/spin'
import { User } from '../../../types/User'
import React, { createContext, useState } from 'react'
import { useGetMe } from '../../auth/hooks/useGetMe'
import { AbilityProvider } from './AbilityContext'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  update: (user: Partial<User>) => void
  login: (user: any) => void
  logout: () => void
}

interface PropsWithChildren {
  children: React.ReactNode
  data?: User
}

const withAuth = (Component: React.FC<PropsWithChildren>) => {
  const HocComponent = (props: PropsWithChildren) => {
    const { data, ...query } = useGetMe()

    if (query.isLoading) {
      return <Spin />
    }

    return <Component {...props} data={data} />
  }
  HocComponent.displayName = `withAuth(${Component.displayName || Component.name})`
  return HocComponent
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<PropsWithChildren> = withAuth(
  ({ children, data }) => {
    const [user, setUser] = useState<User | null>(data || null)
    const login = (user: User) => {
      setUser(user)
    }
    const logout = () => {
      setUser(null)
    }
    const update = (data: Partial<User>) => {
      if (data && user?.id) {
        setUser({ ...user, ...data })
      }
    }
    const isAuthenticated = !!user?.email

    return (
      <AuthContext.Provider
        value={{ isAuthenticated, user, login, logout, update }}
      >
        <AbilityProvider roles={user?.roles || []}>{children}</AbilityProvider>
      </AuthContext.Provider>
    )
  }
)

export { AuthContext, AuthProvider }
