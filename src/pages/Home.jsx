import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from '../hooks/useExpensesContext.js';
import host from '../host.js';
import AddExpenseForm from '../components/AddExpenseForm.jsx';

function Home() {
    const { user } = useAuthContext();
    
    const {expenses, organiseExpenses} = useExpensesContext();
    
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
            organiseExpenses({type: 'GET_EXPENSES', payload: json});
        }
        if (user) {
            getExpenses();
        }
    }, [user, organiseExpenses])

    return (
        <>
            <div className="bg-toolite">
                <div className='max-width p-5 center-div justify-start bg-lite'>
                    <button onClick={() => setOpenForm(!openForm)} className='btn w-full hover:bg-green-500'>Add a expense</button>
                    {openForm && <AddExpenseForm />}
                    {
                        expenses &&
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Description</th>
                                    <th>Amount</th>
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
                                        </tr>
                                    )
                                    )
                                }
                                {
                                    <tr>
                                        <td>{ }</td>
                                        <td>Total</td>
                                        <td>{expenses.sum}</td>
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