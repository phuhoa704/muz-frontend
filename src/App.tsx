import ErrorFallback from "./components/ErrorFallback"
import { ErrorBoundary } from "react-error-boundary"
import { AppPrividers } from './providers'
import AppRoutes from './routes'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppPrividers>
        <AppRoutes />
      </AppPrividers>
    </ErrorBoundary>
  )
}

export default App
