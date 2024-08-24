import { createContext, useState } from "react";

const ModalContext = createContext(false);

const ModalContextProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen}}>
            {children}
        </ModalContext.Provider>

    )
}

export {ModalContext, ModalContextProvider}