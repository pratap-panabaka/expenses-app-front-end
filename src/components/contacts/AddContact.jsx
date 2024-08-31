import { useState } from "react";
import host from "../../host";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useContactsContext } from "../../hooks/useContactsContext";

const AddContact = ({ onClose }) => {

    const { user } = useAuthContext();
    const { dispatch } = useContactsContext();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const addContact = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setError('name & mobile fileds cannot be empty');
            return;
        }

        const formData = { name, phone }

        try {
            const response = await fetch(`${host}/api/contacts`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            dispatch({
                type: "ADD_CONTACT",
                payload: json
            });
        } catch (error) {
            console.log(error);
        }

        setName('');
        setPhone('');
        setError('');
        e.target.reset();
        onClose();
    }

    return (
        <div className="max-width z-50">
            <form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={addContact}>
                <input placeholder="Name" type="text" value={name || ''}
                    onChange={(e) => setName(e.target.value)} required name="name"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="Phone - Min length 3" type="tel"
                    pattern="(?=.{2,20}$)((\+)?(\d)((?:-|\s)?(\d))+)"
                    value={phone || ''}
                    onChange={(e) => setPhone(e.target.value)} required name="phone"
                    autoComplete="off"
                />
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Add Contact
                    </button>
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div>
    )
}

export default AddContact;