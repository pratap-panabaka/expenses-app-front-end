import { useState } from "react";
import host from "../host.js";
import useAuthContext from "./useAuthContext.js";

const useLogin = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
        }

        if(!response.ok) {
            setError(json.error);
        }
    }

    return { login, error };
}

export { useLogin };