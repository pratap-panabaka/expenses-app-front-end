import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from "../hooks/useExpensesContext";
import useModalContext from "../hooks/useModalContext";
import host from "../host";

const DeleteConfirmation = () => {

    const { user } = useAuthContext();
    const { dispatch } = useExpensesContext();
    const {setModalOpen, id} = useModalContext();

    const onDel = () => {
        const delExpense = async () => {
            const response = await fetch(`${host}/api/expenses`, {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                console.log(id);
                dispatch({ type: 'DEL_EXPENSE', payload: { id, sum: json.sum } });
                setModalOpen(false);
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <div className="bg-white z-50 p-20">
            <h1>Are you sure to Delete?</h1>
            <button className="btn" onClick={onDel}>Delete</button>
        </div>
    )
}

export default DeleteConfirmation;