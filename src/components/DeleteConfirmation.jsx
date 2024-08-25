import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from "../hooks/useExpensesContext";
import useModalContext from "../hooks/useModalContext";
import host from "../host";

const DeleteConfirmation = () => {

    const { user } = useAuthContext();
    const { dispatch } = useExpensesContext();
    const { setModalOpen, id } = useModalContext();

    const onDel = () => {
        const delExpense = async () => {
            const response = await fetch(`${host}/api/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DEL_EXPENSE', payload: { id, sum: json.sum } });
                setModalOpen(false);
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <div className="bg-lite z-50 p-5 border-4">
            <h1 className="font-bold text-white text-xl p-5">Are you sure to Delete?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn focus:ring-4 focus:ring-toodark" onClick={onDel} autoFocus>Delete</button>
                <button className="btn focus:ring-4 focus:ring-toodark" onClick={() => setModalOpen(false)}>No</button>
            </div>
        </div>
    )
}

export default DeleteConfirmation;