import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import Loader from "../../components/ui/loader";

const Dashboard = lazy(() => import('./pages'))

export default function DashboardRoutes() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="" element={<Dashboard />}/>
            </Routes>
        </Suspense>
    )
}