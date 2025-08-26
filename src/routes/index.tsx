import { lazy, Suspense } from 'react'
import { useAuth } from '../hooks/auth'
import Loader from '../components/ui/loader'

const PublicRoutes = lazy(() => import('./PublicRoutes'))
const PrivateRoutes = lazy(() => import('./PrivateRoutes'))

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Suspense fallback={<Loader />}>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </Suspense>
  )
}

export default AppRoutes
