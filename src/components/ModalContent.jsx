import { useEffect } from "react";
import {useModalContext} from "../hooks/useModalContext";
import EditExpense from "./EditExpense";
import AddExpense from "./AddExpense";
import Logout from "./Logout";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import DeleteExpense from "./DeleteExpense";

export default function ModalContent() {

    const { modalOpen, setModalOpen, popup, setPopup, setId } = useModalContext();

    useEffect(() => {
        const esc = (e) => {
            if (e.keyCode === 27) {
                setModalOpen(false);
            }
        };

        if (modalOpen) {
            document.body.addEventListener('keydown', esc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.removeEventListener('keydown', esc);

            document.body.style.overflow = 'unset';
            document.body.style['overflow-x'] = 'hidden';
            setPopup(null);
            setId(null);
            setModalOpen(false);
        }
    }, [modalOpen, setId, setModalOpen, setPopup])

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black/10 flex text-center justify-center items-center p-5 z-50">
            {
                popup === 'add' && <AddExpense />
            }
            {
                popup === 'edit' && <EditExpense />
            }
            {
                popup === 'delete' && <DeleteExpense />
            }
            {
                popup === 'logout' && <Logout />
            }
            {
                popup === 'add-contact' && <AddContact />
            }
            {
                popup === 'edit-contact' && <EditContact />
            }
            {
                popup === 'delete-contact' && <DeleteContact />
            }
        </div>
    );
}