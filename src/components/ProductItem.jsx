import React from 'react';
import { useDispatch } from 'react-redux';
import { showPopup } from '../store/popupSlice';
import { formatPrice } from './FormatPrice'
import './ProductItem.css'
const ProductItem = ({ product }) => {
  const formattedPrice = formatPrice(product.price);
   const dispatch = useDispatch();

    return (
        <div className="product-item"
        onClick={() => dispatch(showPopup(product))}
        >
            <div className="product-image-wrapper">
              <img 
                    src={product.img1} 
                    alt={product.name} 
                    className="product-image"
                />
            </div>
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{formattedPrice}</p>
            </div>
        </div>
    );
};

export default ProductItem;