import { createContext, useState } from "react";

const ExpensesContext = createContext(null);

const ExpensesContextProvider = ({ children }) => {
    const [expenses, setExpenses] = useState(null);

    return (
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>
            {children}
        </ExpensesContext.Provider>
    )
}

export { ExpensesContext, ExpensesContextProvider }