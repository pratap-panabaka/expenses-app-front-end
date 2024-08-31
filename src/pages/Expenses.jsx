import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useModalContext } from '../hooks/useModalContext.js';
import host from '../host.js';
import Portal from '../components/Portal.jsx';
import intToWords from '../utils/intToWords.js';
import { useExpensesContext } from '../hooks/useExpensesContext.js';

function Expenses() {
    const { user } = useAuthContext();
    const { setPopup } = useModalContext();
    const { expenses, dispatch } = useExpensesContext();

    const [showError, setShowError] = useState(null);

    const formatDate = (timestamp) => {
        const options = { month: 'short', day: '2-digit' };
        return new Date(timestamp).toLocaleDateString('en-US', options);
    }

    useEffect(() => {

        const getExpenses = async () => {
            try {
                const response = await fetch(`${host}/api/expenses`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json(); // expect array of objects
                dispatch({ type: "GET_EXPENSES", payload: json });
            } catch (error) {
                setShowError(true);
            }
        }
        if (user) {
            getExpenses();
        }
    }, [user, setPopup, dispatch]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className='min-height bg-dark overflow-x-hidden w-full'>
                <div className='grid grid-cols-3 items-center justify-center'>
                    <p>{ }</p>
                    <h1 className='text-center text-white font-bold text-xl p-4'>Expenses List</h1>
                    <Portal action={"add"} />
                </div>
                {
                    showError && (
                        <h1 className='center-div font-bold text-white text-2xl min-h-[calc(100vh-8rem)]'>
                            Fetch Error, Check backend conncted and running?
                        </h1>
                    )
                }
                {
                    expenses &&
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.data.map((expense, idx) =>
                                (
                                    <tr key={expense.id}>
                                        <td align='center'>{idx + 1}</td>
                                        <td align='center'>{formatDate(expense.created_at)}</td>
                                        <td align='center'>{expense.description}</td>
                                        <td align='right'>{expense.amount}</td>
                                        <td align='center'>
                                            <Portal id={expense.id} action={"edit"} />
                                        </td>
                                        <td align='center'>
                                            <Portal id={expense.id} action={"delete"} />
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                expenses.sum &&
                                <tr>
                                    <td align='center' colSpan={3}>
                                        <h3 className='text-toodark font-bold text-xl'>
                                            TOTAL
                                            <span className='text-toodark text-xl'> ({intToWords(expenses.sum)})</span>
                                        </h3>
                                    </td>
                                    <td className='font-bold text-2xl text-toodark text-right'>
                                        {expenses.sum}
                                    </td>
                                    <td colSpan={2}>{ }</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Expenses;