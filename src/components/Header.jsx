import { useLogout } from "../hooks/useLogout.js";
import useAuthContext from "../hooks/useAuthContext.js";
import CustomLink from "./CustomLink.jsx";
import Modal from "./Modal.jsx";
import { useState } from "react";

function Header() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const [modalOpen, setModalOpen] = useState(false);

    const onLogout = () => {
        logout()
    }

    return (
        <header className="bg-toodark sticky top-0 z-50">
            <nav className='flex justify-between items-center h-16 p-4 max-width'>
                <div className="text-white font-bold text-xl">
                    Expenses App
                </div>
                {user && (
                    <div className="flex flex-col xs:flex-row xs:space-x-2 justify-center items-center text-white">
                        <p>{user.email}</p>
                        <button onClick={() => setModalOpen(true)} className="btn-sm xs:btn">Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="text-white flex flex-row space-x-5">
                        <CustomLink to="/login" routeName="Login" />
                        <CustomLink to="/signup" routeName="Signup" />
                    </div>
                )}
            </nav>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className='flex flex-col items-center rounded bg-blue-500 p-5'>
                    <p className='font-bold text-white'>Are you sure to Logout?</p>
                    <button className='btn text-red-500 hover:text-red-800' onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </Modal>
        </header>
    )
}

export default Header;