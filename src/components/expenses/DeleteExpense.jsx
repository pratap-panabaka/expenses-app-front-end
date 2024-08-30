import { useAuthContext } from "../../hooks/useAuthContext";
import { useExpensesContext } from "../../hooks/useExpensesContext";
import { useModalContext } from "../../hooks/useModalContext";
import host from "../../host";

const DeleteExpense = ({ onClose }) => {

    const { user } = useAuthContext();
    const { id } = useModalContext();
    const { dispatch } = useExpensesContext();

    const onDel = () => {
        const delExpense = async () => {
            const response = await fetch(`${host}/api/expenses/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            if (response.ok) {
                onClose();
                dispatch({ type: "DELETE_EXPENSE", payload: json })
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <div className="bg-lite z-50 p-5 border-4 boder-toodark">
            <h1 className="font-bold text-xl p-5">Are you sure to Delete?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn" onClick={onDel} autoFocus>Delete</button>
                <button className="btn" onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default DeleteExpense;