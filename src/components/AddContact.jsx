import { useState } from "react";
import host from "../host";
import { useAuthContext } from "../hooks/useAuthContext";
import { useModalContext } from "../hooks/useModalContext";

const AddContact = () => {

    const { user } = useAuthContext();
    const { setModalOpen } = useModalContext();

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
            if (response.ok) {
                console.log('response OK')
            }
        } catch (error) {
            console.log(error);
        }

        setName('');
        setPhone('');
        setError('');
        e.target.reset();
        setModalOpen(false);
    }

    return (
        <div className="max-width z-50">
            <form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={addContact}>
                <input placeholder="Name" type="text" value={name || ''}
                    onChange={(e) => setName(e.target.value)} required name="name"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="Phone" type="tel"
                    pattern="(?=.{3,20}$)((\+)?(\d)((?:-|\s)?(\d))+)"
                    value={phone || ''}
                    onChange={(e) => setPhone(e.target.value)} required name="phone"
                />
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Add Contact
                    </button>
                    <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div>
    )
}

export default AddContact;