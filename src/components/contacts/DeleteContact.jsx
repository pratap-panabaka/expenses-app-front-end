import { useAuthContext } from "../../hooks/useAuthContext";
import { useContactsContext } from "../../hooks/useContactsContext";
import { useModalContext } from "../../hooks/useModalContext";
import host from "../../host";

const DeleteContact = ({ onClose }) => {
    const { user } = useAuthContext();
    const { id } = useModalContext();
    const { dispatch } = useContactsContext();

    const onDel = () => {
        const delContact = async () => {
            const response = await fetch(`${host}/api/contacts/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            dispatch({ type: "DELETE_CONTACT", payload: json });
            if (response.ok) {
                onClose();
            }
        }
        if (user) {
            delContact();
        }
    }

    return (
        <div className="bg-lite z-50 p-5 border-4 border-toodark">
            <h1 className="font-bold text-xl p-5">Are you sure to Delete?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn" onClick={onDel} autoFocus>Delete</button>
                <button className="btn" onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default DeleteContact;