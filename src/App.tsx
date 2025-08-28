import ErrorFallback from '@/components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import { AppProviders } from '@/providers'
import AppRoutes from '@/routes'
import { LoadingBarContainer } from 'react-top-loading-bar'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <LoadingBarContainer>
          <AppRoutes />
        </LoadingBarContainer>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
