import { useLogout } from "../hooks/useLogout";
import { useModalContext } from "../hooks/useModalContext";

const Logout = ({onClose}) => {

    const { logout } = useLogout();
    const { setId } = useModalContext();

    const onLogout = () => {
        logout();
        setId(null);
        onClose();
    }

    return (
        <div className="bg-lite z-50 p-5 border-4">
            <h1 className="font-bold text-xl p-5">Are you sure to Logout?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn" onClick={onLogout} autoFocus>Logout</button>
                <button className="btn" onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default Logout;