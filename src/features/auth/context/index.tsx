import React, { createContext, PropsWithChildren, useState } from 'react'

interface LoginFormState {
    email: string;
    password: string;
}

type LoginFormContextType = {
    formData: LoginFormState;
    setFormData: React.Dispatch<React.SetStateAction<LoginFormState>>
}

const LoginFormContext = createContext<LoginFormContextType>({} as LoginFormContextType)

export const useLoginFormContext = createContext(LoginFormContext)

export const LoginFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    })
    return (
        <LoginFormContext.Provider value={{ formData, setFormData }}>
            {children}
        </LoginFormContext.Provider>
    )
}

export const withLoginFormProvider = (Component: React.FC) => {
    const WithLoginFormProvider: React.FC = () => (
        <LoginFormProvider>
            <Component />
        </LoginFormProvider>
    )
    WithLoginFormProvider.displayName = `WithLoginFormProvider${Component.displayName}`
    return WithLoginFormProvider;
}
