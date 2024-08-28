import { createContext, useState } from "react";

const ContactsContext = createContext(null);

const ContactsContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState(null);

    return (
        <ContactsContext.Provider value={{ ...contacts, setContacts}}>
            {children}
        </ContactsContext.Provider>
    )
}

export {ContactsContext, ContactsContextProvider}