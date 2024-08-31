import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useModalContext } from "../../hooks/useModalContext";
import host from "../../host";
import { useExpensesContext } from "../../hooks/useExpensesContext";

const EditExpense = ({ onClose }) => {

    const { user } = useAuthContext();
    const { id } = useModalContext();
    const { dispatch } = useExpensesContext();

    const [description, setDescription] = useState(undefined);
    const [amount, setAmount] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const getExpense = async () => {
            try {
                const response = await fetch(`${host}/api/expenses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json();
                setAmount(json.amount);
                setDescription(json.description);
            } catch (err) {
                console.log(err)
            }
        }

        getExpense();
    }, [id, user.token])

    const editExpense = async (e) => {
        e.preventDefault();

        if (!description || !amount) {
            setError('description & amount fileds cannot be empty');
            return;
        }

        const formData = { description, amount }

        try {
            const response = await fetch(`${host}/api/expenses/${id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                setDescription('');
                setAmount('');
                setError('');
                onClose();
                dispatch({ type: "UPDATE_EXPENSE", payload: json })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-width z-50">
            < form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={editExpense}>
                <div className="flex flex-col">
                <label className="text-left">Description</label>
                <input placeholder="description" type="text" value={description || ''}
                        onChange={(e) => setDescription(e.target.value)} required name="desc"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-left">Amount</label>
                    <input placeholder="amount" type="number" value={amount || ''} min={0}
                        onChange={(e) => setAmount(e.target.value)} required name="amount"
                    />
                </div>
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Save Edits
                    </button>
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div >
    )
}

export default EditExpense;