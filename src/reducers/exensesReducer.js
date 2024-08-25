const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXPENSES': {
            let expenses = { ...action.payload }
            return { expenses };
        }

        case 'ADD_EXPENSE': {
            const expenses = {
                data: [...action.payload.data, ...state.expenses.data],
                sum: action.payload.sum
            }
            return { expenses };
        }

        case 'UPDATE_EXPENSE': {
            let {amount, description, id, sum} = action.payload;
            const expenses = {
                data: state.expenses.data.map(expense => expense.id == id ? {...expense, amount, description } : expense),
                sum
            }
            return { expenses };
        }

        case 'DEL_EXPENSE': {
            let { id, sum } = action.payload
            const expenses = {
                data: state.expenses.data.filter(expense => expense.id != id),
                sum
            }
            return { expenses };
        }

        default: {
            return state;
        }
    }
}

export default expensesReducer;