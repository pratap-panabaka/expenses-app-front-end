import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import host from "../host";

const useSignup = () => {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        try {

            const response = await fetch(`${host}/api/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));

                dispatch({ type: 'LOGIN', payload: json });
            } else {
                setError(json.error);
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return { signup, error }
}

export { useSignup };