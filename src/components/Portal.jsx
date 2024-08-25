import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import useModalContext from '../hooks/useModalContext';

export default function Portal({action, id}) {
    const { modalOpen, setModalOpen, setPopup, setId } = useModalContext();

    const onClick = (e) => {
        setModalOpen(true);
        setPopup(action);
        setId(e.target.id);
    }

    let buttonTitle;

    switch (action) {
        case 'logout': {
            buttonTitle = 'Logout';
            break;
        }

        case 'add': {
            buttonTitle = 'Add';
            break;
        }

        case 'edit': {
            buttonTitle = 'Edit';
            break;
        }

        case 'delete': {
            buttonTitle = 'Delete';
            break;
        }
    }

    return (
        <>
            <button className="w-fit mx-auto bg-toodark text-white font-bold border-rounded-large px-5 py-1" id={id} onClick={onClick}>{buttonTitle}</button>
            {modalOpen && createPortal(
                <ModalContent />,
                document.body
            )}
        </>
    );
}