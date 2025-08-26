import { ReactNode, createContext, useState } from 'react'

interface ModalContextType {
    isOpen: boolean;
    content: ReactNode;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode | null>(null)

    const openModal = (content: ReactNode) => {
        setContent(content);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setContent(null);
        }, 300);
    }
  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
        {children}
        {isOpen && content}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
export type { ModalContextType }