import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext.js";
import host from '../host.js';
import Portal from '../components/Portal.jsx';
import useModalContext from '../hooks/useModalContext.js';
import intToWords from '../utils/intToWords.js';

function Expenses() {
    const { user } = useAuthContext();
    const { modalOpen, setModalOpen, setPopup } = useModalContext();
    const [expenses, setExpenses] = useState(null);
    const [showError, setShowError] = useState(null);

    useEffect(() => {

        // bind backtick for opeing add form
        const backtick = (e) => {
            if (e.keyCode === 192) {
                e.preventDefault();
                setModalOpen(true);
                setPopup('add');
            }
        }

        if (!modalOpen) {
            document.body.addEventListener('keydown', backtick);
        }

        const getExpenses = async () => {
            try {
                const response = await fetch(`${host}/api/expenses`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json(); // expect array of objects
                console.log(json);
                setExpenses(json);
            } catch (error) {
                setShowError(true);
            }
        }
        if (user) {
            getExpenses();
        }

        return () => {
            document.body.removeEventListener('keydown', backtick);
        }
    }, [user, modalOpen, setModalOpen, setPopup]);

    return (
        <>
            <div className="bg-toolite grid grid-cols-6">
                <div></div>
                <div className='min-height bg-[#009879] overflow-x-hidden col-span-4'>
                    <div className='grid grid-cols-3 bg-dark items-center justify-center'>
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
                        <table className='table-fixed w-full'>
                            <thead>
                                <tr>
                                    <th colSpan={1}>S.No</th>
                                    <th colSpan={7}>Description</th>
                                    <th colSpan={2}>Amount</th>
                                    <th colSpan={2} >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expenses.data.map((expense, idx) =>
                                    (
                                        <tr key={expense.id}>
                                            <td colSpan={1} align='center'>{idx + 1}</td>
                                            <td colSpan={7}>{expense.description}</td>
                                            <td colSpan={2} align='right'>{expense.amount}</td>
                                            <td colSpan={1} className='text-center'>
                                                <Portal id={expense.id} action={"edit"} />
                                            </td>
                                            <td colSpan={1} className='text-center'>
                                                <Portal id={expense.id} action={"delete"} />
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    expenses.sum &&
                                    <tr>
                                        <td colSpan={8} align='center'>
                                            <h3 className='text-toodark font-bold text-xl'>
                                                TOTAL
                                                <span className='text-toodark text-xl'> ({intToWords(expenses.sum)})</span>
                                            </h3>
                                        </td>
                                        <td colSpan={2} className='font-bold text-2xl text-toodark text-right'>
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
        </>
    )
}

export default Expenses;