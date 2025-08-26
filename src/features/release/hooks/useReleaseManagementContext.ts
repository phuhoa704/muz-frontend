import { useContext } from 'react'
import { ReleaseManagementContext } from '../context'

export const useReleaseManagementState = () => {
  const context = useContext(ReleaseManagementContext)

  if (!context) {
    throw new Error(
      'useReleaseManagementState must be used within a ReleaseManagementContext'
    )
  }

  return context
}
