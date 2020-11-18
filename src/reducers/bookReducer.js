

const initialState = {
    books: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_BOOKS":
            return {
                ...state,
                books: action.books
            };
        default:
            return state;
    }
}