const initialState = {
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWPAGE':
            return {
                currentPage: action.pageNumber
            };
        case 'PREVIOUS':
            return {
                currentPage: state.currentPage - 1
            };
        case 'NEXT':
            return {
                currentPage: state.currentPage + 1
            };
        default:
            return state;
    }
}

export default reducer;