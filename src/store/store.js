import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./popupSlice";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
export const store = configureStore({
    reducer: {
        popup: popupSlice,
        user: userReducer,
        cart: cartReducer,
    },
});