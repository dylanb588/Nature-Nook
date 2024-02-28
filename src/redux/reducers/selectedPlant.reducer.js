const singlePLantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PLANT':
            return action.payload;
        case 'CLEAR_PLANT':
            return {};
        default:
            return state;
    }
}

export default singlePLantReducer;