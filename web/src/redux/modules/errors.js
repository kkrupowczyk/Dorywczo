
const initState = [];

export default function error(state = initState, action) {

    if (action.error) {
        return state.push(action.error)
    }

    return state
}