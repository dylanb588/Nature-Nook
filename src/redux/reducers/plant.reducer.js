const plantReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            return action.payload;
        default:
            return state;
    }
};

const singlePLantReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PLANT':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    plantReducer,
    singlePLantReducer
});

