import { useEffect } from "react";
import useModalContext from "../hooks/useModalContext";
import EditForm from "./EditForm";
import DeleteConfirmation from "./DeleteConfirmation";
import ExpenseForm from "./ExpenseForm";

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
    }, [])

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex text-center justify-center items-center p-5">
                {
                    popup === 'add' && <ExpenseForm />
                }
                {
                    popup === 'edit' && <EditForm />
                }
                {
                    popup === 'delete' && <DeleteConfirmation />
                }
        </div>
    );
}