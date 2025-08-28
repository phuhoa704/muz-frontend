import { lazy, Suspense } from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import { Spin } from '@/components/ui/spin/spin'
import { Routes, Route } from 'react-router-dom'

const AuthRoutes = lazy(() => import('@/features/auth/routes'))

const PublicRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <DefaultLayout>
        <Routes>
          <Route path="*" element={<AuthRoutes />} />
        </Routes>
      </DefaultLayout>
    </Suspense>
  )
}

export default PublicRoutes
