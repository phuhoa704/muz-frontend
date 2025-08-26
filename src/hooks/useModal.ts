import { ModalContext, ModalContextType } from "../context";
import { useContext } from "react";

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);

    if(!context) {
        throw new Error('useModal must be used within ModalProvider')
    }

    return context;
}