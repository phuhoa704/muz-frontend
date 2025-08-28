import { Toaster } from '@/components/ui/toast/toaster'
import { ModalProvider } from '@/context'
import { AuthProvider } from '@/features/access-control/context/AuthContext'
import { queryClient } from '@/lib/react-query'
import { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </HelmetProvider>

      <Toaster />
    </QueryClientProvider>
  )
}

export { AppProviders }
