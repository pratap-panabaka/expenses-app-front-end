import { useState } from 'react';
import { useSignup } from '../hooks/useSignup.js';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }

    return (
        <>
            {
                <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-start 2xl:flex-row">
                    <div className='flex flex-col items-center justify-center 2xl:w-1/3'>
                        <img
                            className="w-96 bg-lite p-10"
                            src="/login-svgrepo-com.svg"
                            alt="Login Photo"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className='flex-1 2xl:min-h-[calc(100vh-4rem)] flex flex-col w-full bg-dark px-12 2xl:w-2/3 space-y-5 items-center justify-center mx-auto'>
                        <h1 className='text-2xl font-bold text-lite'>Signup for the Expenses App</h1>
                        <input
                            type='email'
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            className='w-full h-12 pl-2 focus:ring-1 focus:ring-toodark caret-toodark placeholder-dark'
                            required
                        />
                        <input
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            className='w-full h-12 pl-2 focus:ring-1 focus:ring-toodark caret-toodark placeholder-dark'
                            required
                        />
                        <button className='btn bg-lite text-toodark hover:bg-blue-500 hover:text-white focus:bg-blue-500'>
                            Signup
                        </button>
                        {
                            error && (<h1 className='text-red-500 font-bold'>{error}</h1>)
                        }
                    </form>
                </div >
            }
        </>
    )
}

export default Signup;