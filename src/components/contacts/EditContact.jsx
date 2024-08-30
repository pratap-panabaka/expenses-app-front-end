import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useModalContext } from "../../hooks/useModalContext";
import host from "../../host";
import { useContactsContext } from "../../hooks/useContactsContext";

const EditContact = ({ onClose }) => {

    const { user } = useAuthContext();
    const { id } = useModalContext();
    const { dispatch } = useContactsContext();

    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const getContact = async () => {
            try {
                const response = await fetch(`${host}/api/contacts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json();
                setName(json.name);
                setPhone(json.phone);
            } catch (err) {
                console.log(err)
            }
        }

        getContact();
    }, [id, user.token])

    const editContact = async (e) => {
        e.preventDefault();

        if (!name || !phone) {
            setError('name & phone fileds cannot be empty');
            return;
        }

        const formData = { name, phone }

        try {
            const response = await fetch(`${host}/api/contacts/${id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            dispatch({ type: "UPDATE_CONTACT", payload: json });

            if (response.ok) {
                setName('');
                setPhone('');
                setError('');
                onClose();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="max-width z-50">
            < form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={editContact}>
                <input placeholder="Name" type="text" value={name || ''}
                    onChange={(e) => setName(e.target.value)} required name="name"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="Phone" type="tel"
                    pattern="(?=.{2,20}$)((\+)?(\d)((?:-|\s)?(\d))+)"
                    value={phone || ''}
                    onChange={(e) => setPhone(e.target.value)} required name="phone"
                />
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Save Edits
                    </button>
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div >
    )
}

export default EditContact;