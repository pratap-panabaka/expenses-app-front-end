import { useAuthContext } from "../hooks/useAuthContext";
import { useModalContext } from "../hooks/useModalContext";
import host from "../host";

const DeleteExpense = () => {

    const { user } = useAuthContext();
    const { setModalOpen, id } = useModalContext();

    const onDel = () => {
        const delExpense = async () => {
            const response = await fetch(`${host}/api/expenses/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (response.ok) {
                setModalOpen(false);
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <div className="bg-lite z-50 p-5 border-4 boder-toodark">
            <h1 className="font-bold text-white text-xl p-5">Are you sure to Delete?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn" onClick={onDel} autoFocus>Delete</button>
                <button className="btn" onClick={() => setModalOpen(false)}>No</button>
            </div>
        </div>
    )
}

export default DeleteExpense;