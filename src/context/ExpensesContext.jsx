import { createContext, useReducer } from "react";
import expensesReducer from "../reducers/exensesReducer";

const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
    const [expenses, organiseExpenses] = useReducer(expensesReducer, null);

    return (
        <ExpensesContext.Provider value={{ ...expenses, organiseExpenses }}>
            {children}
        </ExpensesContext.Provider>
    )
}

export {ExpensesContext, ExpensesContextProvider}