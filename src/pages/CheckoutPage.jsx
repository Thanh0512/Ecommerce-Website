import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { formatPrice } from '../components/FormatPrice';
import { useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../store/actionTypes';
import './CheckoutPage.css';
const CheckoutPage = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector(state => state.cart.listCart);
  const [billingDetails, setBillingDetails] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });
    const calculateTotal = (price, quantity) => {
      const numericPrice = parseFloat(String(price).replace(/\./g, ''));
        return numericPrice * quantity;
    };
    const subtotal = cartList.reduce((sum, item) => {
        return sum + calculateTotal(item.price, item.quantity);
    }, 0);
    
    const total = subtotal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!billingDetails.fullName || !billingDetails.email || !billingDetails.phone || !billingDetails.address) {
            alert('Vui lòng điền đầy đủ thông tin giao hàng.');
            return;
        }

        console.log('Thông tin đặt hàng:', billingDetails);
        console.log('Giỏ hàng:', cartList);
        alert('Đặt hàng thành công! Cảm ơn quý khách.');
        dispatch({ type: CLEAR_CART });
        navigate('/shop');
        };
        if (cartList.length === 0) {
         return (
             <div className="checkout-page">
                 <h1 className="checkout-header">CHECKOUT</h1>
                 <div className="empty-cart-checkout">
                     <p>Giỏ hàng trống. Vui lòng quay lại Shop để mua hàng.</p>
                     <button onClick={() => navigate('/shop')} className="back-to-shop-btn">
                         Quay lại Shop
                     </button>
                 </div>
             </div>
         );
    }


    return (
        <div className="checkout-page">
            <div className="checkout-header-bar">
                <h1 className="checkout-header">CHECKOUT</h1>
               <p className="breadcrumb">
                   
                    <span 
                        className="breadcrumb-link" 
                        onClick={() => navigate('/')}
                    >
                        HOME
                    </span> 
                    / 
                    
                    <span 
                        className="breadcrumb-link" 
                        onClick={() => navigate('/cart')}
                    >
                        CART
                    </span>
                    <span className="current">/CHECKOUT</span></p>
            </div>
            
            <form className="checkout-content" onSubmit={handlePlaceOrder}>
              
            <div className="billing-details-section">
                    <h2 className="section-title">BILLING DETAILS</h2>

                    <label htmlFor="fullName">FULL NAME:</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName"
                        value={billingDetails.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter Your Full Name Here!" 
                    />

                    <label htmlFor="email">EMAIL:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={billingDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter Your Email Here!" 
                    />

                    <label htmlFor="phone">PHONE NUMBER:</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={billingDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter Your Phone Number Here!" 
                    />

                    <label htmlFor="address">ADDRESS:</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address"
                        value={billingDetails.address}
                        onChange={handleInputChange}
                        placeholder="Enter Your Address Here!" 
                    />

                    <button type="submit" className="place-order-btn">
                        Place order
                    </button>
                </div>
                <div className="your-order-section">
                    <h2 className="section-title">YOUR ORDER</h2>
                    
                    <div className="order-items-list">
                        {cartList.map(item => (
                            <div key={item.id} className="order-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price-qty">
                                    {formatPrice(item.price)} VND x {item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="order-total-row">
                        <span className="total-label">TOTAL</span>
                        <span className="total-amount">{formatPrice(total)} VND</span>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CheckoutPage;