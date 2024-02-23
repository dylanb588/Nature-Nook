const searchUser = (state = [], action) => {
    switch(action.type) {
        case 'SET_RESULTS':
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}

export default searchUser;