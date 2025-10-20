import { ON_LOGIN, ON_LOGOUT } from "./actionTypes";
const initialUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const initialState = {
    user: initialUser,
    isLoggedIn: !!initialUser
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };

        case ON_LOGOUT:

            localStorage.removeItem('currentUser');
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };

        default:
            return state;
    }
};

export default userReducer;