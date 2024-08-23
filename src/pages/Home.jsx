import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import useExpensesContext from '../hooks/useExpensesContext.js';
import host from '../host.js';
import ExpenseForm from '../components/ExpenseForm.jsx';
import Modal from '../components/Modal.jsx';

function Home() {
    const { user } = useAuthContext();

    const { expenses, dispatch } = useExpensesContext();

    const [openForm, setOpenForm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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
                dispatch({ type: 'DEL_EXPENSE', payload: { id, sum: json.sum } });
            }
        }
        if (user) {
            delExpense();
        }
    }

    return (
        <>
            <div className="bg-toolite">
                <div className='max-width bg-lite'>
                    {/* <button onClick={() => setOpenForm(!openForm)} className='btn w-full hover:bg-toodark'>{openForm ? '-' : '+'}</button>
                    {openForm && <ExpenseForm />} */}
                    {
                        expenses &&
                        <table className='border-collapse table-auto w-full whitespace-nowrap'>
                            <thead>
                                <tr className='bg-black text-white sticky top-[4rem]'>
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
                                            <td>
                                                {
                                                    <button id={expense.id} onClick={() => setModalOpen(true)}>Edit</button>
                                                }
                                            </td>
                                            <td><button id={expense.id} onClick={onDel}>Del</button></td>
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
                    <Modal open={modalOpen} onClose={() => setModalOpen(false)} autoFocus={false}>
                        <ExpenseForm />
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Home