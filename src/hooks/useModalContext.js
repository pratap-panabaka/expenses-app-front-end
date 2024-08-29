import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const useModalContext = () => {
    const context = useContext(ModalContext);

    if(!context) {
        throw Error('AuthContext must be used only inside provider');
    }

    return context;
}

export {useModalContext};