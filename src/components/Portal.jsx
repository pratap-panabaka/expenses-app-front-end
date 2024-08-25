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

    return (
        <>
            <button className="w-fit mx-auto bg-toodark text-white border-rounded-large px-5 py-1" id={id} onClick={onClick}>{action}</button>
            {modalOpen && createPortal(
                <ModalContent />,
                document.body
            )}
        </>
    );
}