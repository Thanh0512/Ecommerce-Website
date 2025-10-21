import { ADD_CART, UPDATE_CART, DELETE_CART, CLEAR_CART } from "./actionTypes";

const initialCart = JSON.parse(localStorage.getItem('cartList')) || [];

const initialState = {
    listCart: initialCart
};
const updateLocalStorage = (cartList) => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART:
            {
                const { product, quantity } = action.payload;

                // Kiểm tra xem sản phẩm đã có chưa
                const index = state.listCart.findIndex((item) => item.id === product.id);
                let newCartList;

                if (index !== -1) {
                    // Nếu có rồi: cập nhật lại số lượng
                    newCartList = state.listCart.map((item, i) =>
                        i === index ? {...item, quantity: item.quantity + quantity } :
                        item
                    );
                } else {
                    // Nếu chưa có: thêm mới sản phẩm vào mảng
                    newCartList = [...state.listCart, {...product, quantity }];
                }

                updateLocalStorage(newCartList);
                return {...state, listCart: newCartList };
            }

        case UPDATE_CART:
            {
                const { id, newQuantity } = action.payload;

                // TẠO DANH SÁCH MỚI bằng cách sử dụng map
                const newCartList = state.listCart.map(item => {
                    if (item.id === id) {
                        // TẠO OBJECT SẢN PHẨM MỚI
                        return {
                            ...item,
                            quantity: newQuantity
                        };
                    }
                    return item;
                });

                updateLocalStorage(newCartList);
                return {
                    ...state,
                    listCart: newCartList
                };
            }

        case DELETE_CART:
            {
                const idToDelete = action.payload.id;

                // Sử dụng filter trên state hiện tại để tạo MẢNG MỚI
                const newCartList = state.listCart.filter(item => item.id !== idToDelete);

                updateLocalStorage(newCartList);
                return {
                    ...state,
                    listCart: newCartList
                };
            }
        case CLEAR_CART:
            {
                const newCartList = [];
                updateLocalStorage(newCartList);
                return {...state, listCart: newCartList };
            }


        default:
            return state;
    }
};

export
default cartReducer;