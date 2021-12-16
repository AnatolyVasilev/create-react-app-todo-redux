export default function appReducer(state, action) {
    switch (action.type) {
        case 'todos/change': {
            return {
                ...state,
                todos: [...action.todos]
            }
        }
        default:
            return state
    }
}