const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXPENSES': {
            console.log(action);
            return {
                expenses: action.payload
            }
        }

        case 'ADD_EXPENSE': {
            return {
                expenses: {
                    data: [...action.payload.data, ...state.expenses.data],
                    sum: action.payload.sum
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default expensesReducer;