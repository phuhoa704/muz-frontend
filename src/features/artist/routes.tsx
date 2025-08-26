import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from '../../components/ui/loader'

const ArtistManagementPage = lazy(() => import('./pages/ArtistMangement'))

const ArtistRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="" element={<ArtistManagementPage />} />
      </Routes>
    </Suspense>
  )
}

export default ArtistRoutes
