import { lazy, Suspense } from 'react'
import Loader from '../../components/ui/loader'
import { Routes, Route } from 'react-router-dom'

const SongManagementPage = lazy(() => import('./pages/SongManagement'))

const SongRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
        <Routes>
            <Route path='' element={<SongManagementPage />}/>
        </Routes>
    </Suspense>
  )
}

export default SongRoutes