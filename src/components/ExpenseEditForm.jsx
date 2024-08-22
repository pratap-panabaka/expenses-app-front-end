import { useState } from "react";
import host from "../host";
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from "../hooks/useExpensesContext";

const ExpenseEditForm = () => {

    const { user } = useAuthContext();
    const {organiseExpenses} = useExpensesContext();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const addExpense = async (e) => {
        e.preventDefault();

        if(!description ||!amount) {
            setError('description & amount fileds cannot be empty');
            return;
        }

        console.log('clicked');
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
            organiseExpenses({type: 'ADD_EXPENSE', payload: json})
        } catch (error) {
            console.log(error);
        }

        setDescription('');
        setAmount('');
        setError('');
        e.target.reset();
    }

    return (
        <form className="flex flex-col gap-5 p-5 bg-orange-500" onSubmit={addExpense}>
                <input placeholder="description" type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)} required name="desc"
                    autoFocus
                />
                <input placeholder="amount" type="number" value={amount} min={0}
                    onChange={(e) => setAmount(e.target.value)} required name="amount"
                />
            <button type="submit" className='btn text-red-500 hover:text-red-800 focus:bg-blue-500'>
                Add Expense
            </button>
            {error && <h2>{error}</h2>}
        </form>
    )
}

export default ExpenseEditForm;