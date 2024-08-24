import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from '../hooks/useExpensesContext.js';
import host from '../host.js';
import Modal from '../components/Modal.jsx';
import useModalContext from '../hooks/useModalContext.js';

function Home() {
    const { user } = useAuthContext();
    const { expenses, dispatch } = useExpensesContext();
    const { setModalOpen } = useModalContext();

    const [popup, setPopup] = useState(null);
    const [id, setId] = useState(null);

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

    const onEdit = (e) => {
        setId(e.target.id);
        setPopup('edit');
        setModalOpen(true);
    }

    const onDel = (e) => {
        setId(e.target.id);
        setPopup('delete');
        setModalOpen(true);
    }

    return (
        <>
            <div className="bg-toolite">
                <div className='max-width min-height bg-lite'>
                    <h1 className='text-center text-white font-bold text-xl p-4'>Expenses List</h1>
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
                                                {
                                                    <button className="w-fit mx-auto bg-toodark text-white border-rounded-large px-5 py-1" id={expense.id} onClick={onEdit}>Edit</button>
                                                }
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    <button className="w-fit mx-auto bg-toodark text-white border-rounded-large px-5 py-1" id={expense.id} onClick={onDel}>Delete</button>
                                                }
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
                    <Modal popup={popup} id={id} />
                </div>
            </div>
        </>
    )
}

export default Home