import { createContext, useState } from "react";

const ModalContext = createContext(false);

const ModalContextProvider = ({children}) => {
    const [popup, setPopup] = useState(null);
    const [id, setId] = useState(null);

    return (
        <ModalContext.Provider value={{popup, setPopup, id, setId}}>
            {children}
        </ModalContext.Provider>

    )
}

export {ModalContext, ModalContextProvider}