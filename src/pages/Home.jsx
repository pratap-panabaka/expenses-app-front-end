import { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import host from '../host.js';

function Home() {
    const { user } = useAuthContext();
    const [expenses, setExpenses] = useState(null);

    useEffect(() => {
        const getExpenses = async () => {
            const response = await fetch(`${host}/api/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setExpenses(json);
        }
        if (user) {
            console.log(user);
            getExpenses();
        }
    }, [user])

    return (
        expenses &&
        (
            <div className="bg-toolite">
                <div className='max-width center-div bg-lite'>
                    <h3 className='font-bold font-custom'>{expenses.length}</h3>
                </div>
            </div>
        )
    )
}

export default Home