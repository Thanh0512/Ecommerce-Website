import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../components/FormatPrice';
import { UPDATE_CART,DELETE_CART } from '../store/actionTypes'; 

import './CartPage.css'; 

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartList = useSelector(state => state.cart.listCart); 

    const calculateTotal = (price, quantity) => {
       
        const numericPrice = parseFloat(String(price).replace(/\./g, ''));
        return numericPrice * quantity;
    };

    
    const subtotal = cartList.reduce((sum, item) => {
        return sum + calculateTotal(item.price, item.quantity);
    }, 0);
    
    
    const total = subtotal; 

    const handleQuantityChange = (id, newQuantity) => {
        const quantityValue = parseInt(newQuantity);
        
        if (quantityValue < 1 || isNaN(quantityValue)) {
          
            alert("Số lượng phải lớn hơn 0.");
            return;
        }

        dispatch({
            type: UPDATE_CART,
            payload: { id, newQuantity: quantityValue }
        });
    };

    
    const handleDeleteItem = (id, name) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${name} khỏi giỏ hàng?`)) {
            dispatch({
                type: DELETE_CART,
                payload: { id }
            });
        }
    };
    
    // Xử lý Tăng/Giảm (Dùng cho nút +/-)
    const handleQuantityUpdate = (item, type) => {
        const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity < 1) {
             handleDeleteItem(item.id, item.name);
             return;
        }
        handleQuantityChange(item.id, newQuantity);
    }
    
    // Nếu giỏ hàng rỗng
    if (cartList.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="cart-header">CART</h1>
                <div className="empty-cart">
                    <p>Giỏ hàng của bạn đang trống.</p>
                    <button className="empty-cart-btn" onClick={() => navigate('/shop')}>
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="cart-page">
          
            <h1 className="cart-header">CART</h1>
            <div className="cart-content">
               
                <div className="shopping-cart-section">
                    <h2 className="section-title">SHOPPING CART</h2>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>PRODUCT</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                                <th>REMOVE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList.map(item => (
                                <tr key={item.id} className="cart-item">
                                    <td className="item-image">
                                        <img src={item.img} alt={item.name} />
                                    </td>
                                    <td className="item-product">{item.name}</td>
                                    <td className="item-price">{formatPrice(item.price)} VND</td>
                                    <td className="item-quantity">
                                        <div className="quantity-controls">
                                            <i 
                                                className="fas fa-caret-left"
                                                onClick={() => handleQuantityUpdate(item, 'dec')}
                                            ></i>
                                            <input
                                                type="text"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                            <i 
                                                className="fas fa-caret-right"
                                                onClick={() => handleQuantityUpdate(item, 'inc')}
                                            ></i>
                                        </div>
                                    </td>
                                    <td className="item-total">{formatPrice(calculateTotal(item.price, item.quantity))} VND</td>
                                    <td className="item-remove">
                                        <i 
                                            className="fas fa-trash-alt"
                                            onClick={() => handleDeleteItem(item.id, item.name)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-actions">
                        <span 
                            className="continue-shopping"
                            onClick={() => navigate('/shop')}
                        >
                            ← Continue shopping
                        </span>
                        <button 
                            className="proceed-checkout-btn"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to checkout →
                        </button>
                    </div>
                </div>

                
                
                <div className="cart-total-section">
                    <h2 className="section-title">CART TOTAL</h2>
                    <div className="total-row subtotal-row">
                        <span>SUBTOTAL</span>
                        <span>{formatPrice(subtotal)} VND</span>
                    </div>
                    <div className="total-row total-amount">
                        <span>TOTAL</span>
                        <span>{formatPrice(total)} VND</span>
                    </div>

                    <div className="coupon-area">
                        <input type="text" placeholder="Enter your coupon" />
                        <button className="apply-coupon-btn">
                            <i className="fas fa-gift"></i> Apply coupon
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;