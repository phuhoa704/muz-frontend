import MainLayout from '../layouts/MainLayout'
import { Spin } from '../components/ui/spin/spin'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import SongRoutes from '../features/song/routes'

const DashboardRoutes = lazy(() => import('../features/dashboard/routes'))
const ArtistRoutes = lazy(() => import('../features/artist/routes'))
const ReleaseRoutes = lazy(() => import('../features/release/routes'))

const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route path="" element={<DashboardRoutes />} />
          <Route path="/artist" element={<ArtistRoutes />} />
          <Route path="/release" element={<ReleaseRoutes />} />
          <Route path="/songs" element={<SongRoutes />} />
          <Route path="*" element={<DashboardRoutes />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default PrivateRoutes
