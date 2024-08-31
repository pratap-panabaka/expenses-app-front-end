import { useEffect } from "react";
import { useModalContext } from "../hooks/useModalContext";
import EditExpense from "./expenses/EditExpense";
import AddExpense from "./expenses/AddExpense";
import Logout from "./Logout";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import DeleteContact from "./contacts/DeleteContact";
import DeleteExpense from "./expenses/DeleteExpense";

export default function ModalContent({ onClose }) {

    const { popup, setPopup, setId } = useModalContext();

    useEffect(() => {
        const esc = (e) => {
            if (e.keyCode === 27) {
                onClose();
            }
        };

        document.body.addEventListener('keydown', esc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.removeEventListener('keydown', esc);

            document.body.style.overflow = 'unset';
            document.body.style['overflow-x'] = 'hidden';
            setPopup(null);
            setId(null);
        }

    }, [setId, setPopup, onClose])

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 flex text-center justify-center items-center p-5 z-50">
            {
                popup === 'add' && <AddExpense onClose={onClose} />
            }
            {
                popup === 'edit' && <EditExpense onClose={onClose} />
            }
            {
                popup === 'delete' && <DeleteExpense onClose={onClose} />
            }
            {
                popup === 'logout' && <Logout onClose={onClose} />
            }
            {
                popup === 'add-contact' && <AddContact onClose={onClose} />
            }
            {
                popup === 'edit-contact' && <EditContact onClose={onClose} />
            }
            {
                popup === 'delete-contact' && <DeleteContact onClose={onClose} />
            }
        </div>
    );
}