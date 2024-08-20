import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    const obj = props;
    const {children} = obj;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}