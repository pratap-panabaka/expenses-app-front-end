import { useContext } from "react";
import {ContactsContext} from '../context/ContactsContext';

const useContactsContext = () => {
    const context = useContext(ContactsContext);

    if(!context) {
        throw Error('ContactsContext must be used only inside provider');
    }

    return context;
}

export default useContactsContext;