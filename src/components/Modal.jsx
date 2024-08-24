import { useEffect } from 'react'
import ExpenseForm from './ExpenseForm';
import EditForm from './EditForm';
import DeleteConfirmation from './DeleteConfirmation';
import useModalContext from '../hooks/useModalContext';

function Modal(props) {
    const obj = props;
    const { popup, id } = obj;

    const { modalOpen, setModalOpen } = useModalContext();

    useEffect(() => {
        const esc = (e) => {
            if (e.keyCode === 27) {
                setModalOpen(false);
            }
        };

        document.body.addEventListener('keydown', esc);
        document.body.style.overflow = open ? 'hidden' : 'unset';

        return () => {
            document.body.removeEventListener('keydown', esc);
            document.body.style.overflow = 'unset';
        };
    }, [setModalOpen]);

    return (
        // backdrop
        <div className={`absolute top-0 left-0 w-screen h-screen flex text-center justify-center items-center p-5
                ${modalOpen ? "visible bg-black/60 overflow-hidden" : "invisible"}`}
        >
            {
                popup === 'add' && <ExpenseForm />
            }
            {
                popup === 'edit' && <EditForm id={id} />
            }
            {
                popup === 'delete' && <DeleteConfirmation id={id} />
            }
        </div >
    )
}

export default Modal;