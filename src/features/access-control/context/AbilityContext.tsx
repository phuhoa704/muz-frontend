import { AppAbility, defineAbilitiesFor } from '../config/abilities'
import { Role } from '../types'
import React, { useContext, createContext, useEffect, useState } from 'react'
import { Actions, Subjects } from '../types'

const AbilityContext = createContext<AppAbility | null>(null)

type AbilityProviderProps = {
  roles: Role[]
  children: React.ReactNode
}

export const AbilityProvider: React.FC<AbilityProviderProps> = ({
  roles,
  children,
}) => {
  const [ability, setAbility] = useState(() => defineAbilitiesFor(roles))

  useEffect(() => {
    setAbility(defineAbilitiesFor(roles))
  }, [roles])

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

export const useHasRole = () => {
  const ability = useContext(AbilityContext)

  return (action: Actions, subject: Subjects) => {
    return ability?.can(action, subject)
  }
}

export const useAbility = () => {
  const context = useContext(AbilityContext)
  if (!context) {
    throw new Error('useAbility must be used within AbilityProvider')
  }
  return context
}
