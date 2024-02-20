const singlePLantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PLANT':
            return action.payload;
        default:
            return state;
    }
}

export default singlePLantReducer;