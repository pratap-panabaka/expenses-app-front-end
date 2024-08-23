import { createContext, useReducer } from "react";
import expensesReducer from "../reducers/exensesReducer";

const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
    const [expenses, dispatch] = useReducer(expensesReducer, null);

    return (
        <ExpensesContext.Provider value={{ ...expenses, dispatch }}>
            {children}
        </ExpensesContext.Provider>
    )
}

export {ExpensesContext, ExpensesContextProvider}