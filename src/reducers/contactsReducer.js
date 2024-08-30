const contactsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CONTACTS': {
            return action.payload;
        }

        case 'ADD_CONTACT': {
            const contacts = [action.payload, ...state]
            return contacts;
        }
        
        case 'UPDATE_CONTACT': {
            let { name, phone, id } = action.payload;
            const contacts = state.map(contact => contact.id == id ? { ...contact, name, phone } : contact);
            return contacts;
        }

        case 'DELETE_CONTACT': {
            let { id } = action.payload
            const contacts = state.filter(contact => contact.id != id);
            return contacts;
        }

        default: {
            return state;
        }
    }
}

export default contactsReducer;