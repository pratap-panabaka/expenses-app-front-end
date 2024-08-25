import { useEffect } from 'react'
import ExpenseForm from './ExpenseForm';
import EditForm from './EditForm';
import DeleteConfirmation from './DeleteConfirmation';
import useModalContext from '../hooks/useModalContext';

function Modal(props) {
    const obj = props;
    const { popup, id } = obj;

    const { modalOpen } = useModalContext();

    return (
        // backdrop
        <div className={`absolute top-0 left-0 w-screen h-screen flex text-center justify-center items-center p-5
                ${modalOpen ? "visible bg-black/60" : "invisible"}`}
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