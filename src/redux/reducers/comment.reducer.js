const commentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMENT':
            return action.payload;
        default:
            return state;
    }
};

export default commentReducer;