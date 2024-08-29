import { useEffect, useState } from "react";
import host from "../host";
import useAuthContext from "../hooks/useAuthContext";
import useModalContext from "../hooks/useModalContext";

const EditExpense = () => {

    const { user } = useAuthContext();
    const { setModalOpen, id } = useModalContext();

    const [description, setDescription] = useState(undefined);
    const [amount, setAmount] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {

        const getExpense = async () => {
            try {
                const response = await fetch(`${host}/api/expenses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json();
                setAmount(json.amount);
                setDescription(json.description);
            } catch (err) {
                console.log(err)
            }
        }

        getExpense();
    }, [id, user.token])

    const editExpense = async (e) => {
        e.preventDefault();

        if (!description || !amount) {
            setError('description & amount fileds cannot be empty');
            return;
        }

        const formData = { description, amount }

        try {
            const response = await fetch(`${host}/api/expenses/${id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if(response.ok) {
                console.log('response OK');
            }
        } catch (error) {
            console.log(error);
        }

        setDescription('');
        setAmount('');
        setError('');
        setModalOpen(false);
    }

    return (
        <div className="max-width z-50">
            < form className="flex flex-col gap-5 p-5 bg-lite w-full border-4 border-toodark" onSubmit={editExpense}>
                <input placeholder="description" type="text" value={description || ''}
                    onChange={(e) => setDescription(e.target.value)} required name="desc"
                    autoComplete="off"
                    autoFocus
                />
                <input placeholder="amount" type="number" value={amount || ''} min={0}
                    onChange={(e) => setAmount(e.target.value)} required name="amount"
                />
                <div className="flex gap-2 justify-center">
                    <button type="submit" className='btn'>
                        Save Edits
                    </button>
                    <button className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
                {error && <h2>{error}</h2>}
            </form>
        </div >
    )
}

export default EditExpense;