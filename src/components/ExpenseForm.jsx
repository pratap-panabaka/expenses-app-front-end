import { useState } from "react";
import host from "../host";
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from "../hooks/useExpensesContext";

const ExpenseForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = useExpensesContext();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const addExpense = async (e) => {
        e.preventDefault();

        if (!description || !amount) {
            setError('description & amount fileds cannot be empty');
            return;
        }

        const formData = { description, amount }

        try {
            const response = await fetch(`${host}/api/expenses`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            console.log(json);
            dispatch({ type: 'ADD_EXPENSE', payload: json })
        } catch (error) {
            console.log(error);
        }

        setDescription('');
        setAmount('');
        setError('');
        e.target.reset();
    }

    return (
        <div className="max-width">
            <form className="flex flex-col gap-5 p-5 bg-lite w-full" onSubmit={addExpense}>
                <input placeholder="description" type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)} required name="desc"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="amount" type="number" value={amount} min={0}
                    onChange={(e) => setAmount(e.target.value)} required name="amount"
                />
                <button type="submit" className='p-2 font-bold w-fit mx-auto text-white bg-toodark hover:text-toolite focus:ring-4'>
                    ADD EXPENSE
                </button>
                {error && <h2>{error}</h2>}
            </form>
        </div>
    )
}

export default ExpenseForm;