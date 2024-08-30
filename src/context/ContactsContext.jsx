import { createContext, useReducer } from "react";
import contactsReducer from "../reducers/contactsReducer";

const ContactsContext = createContext(null);

const ContactsContextProvider = ({ children }) => {
    const [contacts, dispatch] = useReducer(contactsReducer, null);

    return (
        <ContactsContext.Provider value={{ contacts, dispatch }}>
            {children}
        </ContactsContext.Provider>
    )
}

export { ContactsContext, ContactsContextProvider }