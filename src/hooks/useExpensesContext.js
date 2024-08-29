import { useContext } from "react";
import {ExpensesContext} from '../context/ExpensesContext';

const useExpensesContext = () => {
    const context = useContext(ExpensesContext);

    if(!context) {
        throw Error('AuthContext must be used only inside provider');
    }

    return context;
}

export {useExpensesContext};