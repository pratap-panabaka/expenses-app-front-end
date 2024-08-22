import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from '../hooks/useExpensesContext.js';
import host from '../host.js';
import ExpenseForm from '../components/ExpenseForm.jsx';

function Home() {
    const { user } = useAuthContext();

    const { expenses, organiseExpenses } = useExpensesContext();

    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        const getExpenses = async () => {
            const response = await fetch(`${host}/api/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json(); // expect array of objects
            console.log(json);
            organiseExpenses({ type: 'GET_EXPENSES', payload: json });
            console.log('expenses', expenses);
        }
        if (user) {
            getExpenses();
        }
    }, [user, organiseExpenses, expenses])

    const onEdit = (e) => {
        console.log(e.target.id);
    }

    const onDel = (e) => {
        const id = e.target.id;
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
                organiseExpenses({ type: 'DEL_EXPENSE', payload: {id, sum: json.sum} });
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <>
            <div className="bg-toolite">
                <div className='max-width p-5 center-div justify-start bg-lite'>
                    <button onClick={() => setOpenForm(!openForm)} className='btn w-full hover:bg-green-500'>Add a expense</button>
                    {openForm && <ExpenseForm />}
                    {
                        expenses &&
                        <table className='w-full table-auto'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expenses.data.map((expense, idx) =>
                                    (
                                        <tr key={expense.id}>
                                            <td>{idx + 1}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.amount}</td>
                                            <td>
                                                {
                                                    <div className='flex justify-around gap-2'>
                                                        <button id={expense.id} onClick={onEdit} className='btn'>Edit</button>
                                                        <button id={expense.id} onClick={onDel} className='btn'>Del</button>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                                {
                                    <tr>
                                        <td>{ }</td>
                                        <td>Total</td>
                                        <td className='font-bold text-2xl text-toodark'>{expenses.sum}</td>
                                        <td>{ }</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Home