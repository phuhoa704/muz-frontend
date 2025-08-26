import ErrorFallback from './components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import { AppPrividers } from './providers'
import AppRoutes from './routes'
import { LoadingBarContainer } from 'react-top-loading-bar'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppPrividers>
        <LoadingBarContainer>
          <AppRoutes />
        </LoadingBarContainer>
      </AppPrividers>
    </ErrorBoundary>
  )
}

export default App
