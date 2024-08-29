import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import host from '../host.js';
import Portal from '../components/Portal';
import useModalContext from '../hooks/useModalContext.js';

function Contacts() {
    const { user } = useAuthContext();
    const [contacts, setContacts] = useState(null);
    const { modalOpen, setModalOpen, setPopup } = useModalContext();
    const [showError, setShowError] = useState(null);

    useEffect(() => {

        // bind backtick for opeing add form
        const backtick = (e) => {
            if (e.keyCode === 192) {
                e.preventDefault();
                setModalOpen(true);
                setPopup('add-contact');
            }
        }

        if (!modalOpen) {
            document.body.addEventListener('keydown', backtick);
        }

        const getContacts = async () => {
            try {
                const response = await fetch(`${host}/api/contacts`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json(); // expect array of objects
                setContacts(json);
            } catch (error) {
                setShowError(true);
            }
        }
        if (user) {
            getContacts();
        }

        return () => {
            document.body.removeEventListener('keydown', backtick);
        }
    }, [user, modalOpen, setModalOpen, setPopup]);

    return (
        <>
            <div className="bg-toolite grid grid-cols-6">
                <div></div>
                <div className='min-height bg-dark overflow-x-hidden col-span-4'>
                    <div className='grid grid-cols-3 items-center justify-center'>
                        <p>{ }</p>
                        <h1 className='text-center text-white font-bold text-xl p-4'>Contacts List</h1>
                        <Portal action={"add-contact"} />
                    </div>
                    {
                        showError && (
                            <h1 className='center-div font-bold text-white text-2xl min-h-[calc(100vh-8rem)]'>
                                Fetch Error, Check backend conncted and running?
                            </h1>
                        )
                    }
                    {
                        contacts && (
                            <table className='table-fixed w-full'>
                                <thead>
                                    <tr>
                                        <th colSpan={1}>S.No</th>
                                        <th colSpan={5}>Name</th>
                                        <th colSpan={4}>Phone Number</th>
                                        <th colSpan={2} >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contacts.map((contact, idx) =>
                                        (
                                            <tr key={contact.id}>
                                                <td colSpan={1} align='center'>{idx + 1}</td>
                                                <td colSpan={5} align='center'>{contact.name}</td>
                                                <td colSpan={4} align='center'>{contact.phone}</td>
                                                <td colSpan={1} align='center'>
                                                    <Portal id={contact.id} action={"edit-contact"} />
                                                </td>
                                                <td colSpan={1} align='center'>
                                                    <Portal id={contact.id} action={"delete-contact"} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Contacts;