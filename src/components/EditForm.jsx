import { useEffect, useState } from "react";
import host from "../host";
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from "../hooks/useExpensesContext";
import useModalContext from "../hooks/useModalContext";

const EditForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = useExpensesContext();
    const { setModalOpen, id } = useModalContext();

    const [description, setDescription] = useState(undefined);
    const [amount, setAmount] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {

        const getExpense = async () => {
            try {
                const response = await fetch(`${host}/api/${id}`, {
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
    }, [id])

    const editExpense = async (e) => {
        e.preventDefault();

        if (!description || !amount) {
            setError('description & amount fileds cannot be empty');
            return;
        }

        const formData = { description, amount }

        try {
            const response = await fetch(`${host}/api/${id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            const sum = json.sum;
            if (response.ok)
                dispatch({ type: 'UPDATE_EXPENSE', payload: { id, sum, ...formData } });
        } catch (error) {
            console.log(error);
        }

        setDescription('');
        setAmount('');
        setError('');
        setModalOpen(false);
    }

    return (
        <div className="max-width z-50">
            <form className="flex flex-col gap-5 p-5 bg-lite w-full border-4" onSubmit={editExpense}>
                <input placeholder="description" type="text" value={description || ''}
                    onChange={(e) => setDescription(e.target.value)} required name="desc"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="amount" type="number" value={amount || ''} min={0}
                    onChange={(e) => setAmount(e.target.value)} required name="amount"
                />
                <button type="submit" className='p-2 font-bold w-fit mx-auto text-white bg-toodark hover:text-toolite focus:ring-4'>
                    EDIT EXPENSE
                </button>
                {error && <h2>{error}</h2>}
            </form>
        </div>
    )
}

export default EditForm;