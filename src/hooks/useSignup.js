import { useState } from "react";
import host from "../host";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        const response = await fetch(`${host}/api/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        }

        if(!response.ok) {
            setError(json.error);
        }
    }

    return { signup, error }
}

export { useSignup };