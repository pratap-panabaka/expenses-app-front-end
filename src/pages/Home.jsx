import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from '../hooks/useExpensesContext.js';
import host from '../host.js';
import useModalContext from '../hooks/useModalContext.js';
import Portal from '../components/Portal';

function Home() {
    const { user } = useAuthContext();
    const { expenses, dispatch } = useExpensesContext();

    useEffect(() => {
        const getExpenses = async () => {
            const response = await fetch(`${host}/api/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json(); // expect array of objects
            dispatch({ type: 'GET_EXPENSES', payload: json });
        }
        if (user) {
            getExpenses();
        }
    }, [user, dispatch])

    return (
        <>
            <div className="bg-toolite">
                <div className='max-width min-height bg-lite overflow-x-hidden'>
                    <div className='grid grid-cols-3 items-center'>
                        <p>{ }</p>
                        <h1 className='text-center text-white font-bold text-xl p-4'>Expenses List</h1>
                        <Portal action={"add"} />
                    </div>
                    {
                        expenses &&
                        <table className='table-auto w-full'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
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
                                            <td>{idx + 1}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.amount}</td>
                                            <td className='text-center'>
                                                <Portal id={expense.id} action={"edit"} />
                                            </td>
                                            <td className='text-center'>
                                                <Portal id={expense.id} action={"delete"} />
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    <tr>
                                        <td colSpan={2}>Total</td>
                                        <td className='font-bold text-2xl text-toodark text-right'>{expenses.sum}</td>
                                        <td colSpan={2}>{ }</td>
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