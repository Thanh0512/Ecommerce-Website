import { createSlice } from "@reduxjs/toolkit";
const popupSlice = createSlice({
    name: "popup",
    initialState: {
        isOpen: false,
        product: null,
    },
    reducers: {
        showPopup: (state, action) => {
            state.isOpen = true;
            state.product = action.payload; // lưu thông tin sản phẩm
        },
        hidePopup: (state) => {
            state.isOpen = false;
            state.product = null;
        },
    },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;