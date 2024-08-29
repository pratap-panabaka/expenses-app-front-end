import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useModalContext } from "../hooks/useModalContext";
import host from "../host";

const ExpenseForm = () => {

    const { user } = useAuthContext();
    const { setModalOpen } = useModalContext();

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
            if (response.ok) {
                console.log('response OK')
            }
        } catch (error) {
            console.log(error);
        }

        setDescription('');
        setAmount('');
        setError('');
        e.target.reset();
        setModalOpen(false);
    }

    return (
        <div className="max-width z-50">
            <form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={addExpense}>
                <input placeholder="Description" type="text" value={description || ''}
                    onChange={(e) => setDescription(e.target.value)} required name="desc"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="Amount" type="number" value={amount || ''} min={0}
                    onChange={(e) => setAmount(e.target.value)} required name="amount"
                />
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Add Expense
                    </button>
                    <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div>
    )
}

export default ExpenseForm;