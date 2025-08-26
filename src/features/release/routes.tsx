import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../../components/ui/loader'

const ReleaseManagementPage = lazy(() => import('./pages/ReleaseManagement'))

const ReleaseRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="" element={<ReleaseManagementPage />} />
      </Routes>
    </Suspense>
  )
}

export default ReleaseRoutes
