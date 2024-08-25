import { useLogout } from "../hooks/useLogout";
import useModalContext from "../hooks/useModalContext";

const Logout = () => {

    const { logout } = useLogout();
    const { setModalOpen, setId } = useModalContext();

    const onLogout = () => {
        logout();
        setModalOpen(false);
        setId(null);
    }

    return (
        <div className="bg-lite z-50 p-5">
            <h1 className="font-bold text-white text-xl p-5">Are you sure to Logout?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn focus:ring-4 focus:ring-toodark" onClick={onLogout} autoFocus>Logout</button>
                <button className="btn focus:ring-4 focus:ring-toodark" onClick={() => setModalOpen(false)}>No</button>
            </div>
        </div>
    )
}

export default Logout;