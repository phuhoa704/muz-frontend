import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '@/components/ui/loader'

const LoginPage = lazy(() => import('./page/LoginPage'))

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Suspense>
  )
}

export default AuthRoutes
