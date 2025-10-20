import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hidePopup } from "../store/popupSlice";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "./FormatPrice";
import "./ProductPopup.css";

const ProductPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, product } = useSelector((state) => state.popup);

  if (!isOpen || !product) return null;

  const handleViewDetail = () => {
    dispatch(hidePopup());
    navigate(`/detail/${product._id.$oid}`);
  };

  return (
    <div className="popup-overlay" onClick={() => dispatch(hidePopup())}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => dispatch(hidePopup())}>✕</button>

        <img src={product.img1} alt={product.name} className="popup-image" />

        <div className="popup-info">
          <h2 className="popup-name">{product.name}</h2>
          <p className="popup-price">{formatPrice(product.price)}</p>
          <p className="popup-desc">{product.short_desc}</p>

          <button className="detail-btn" onClick={handleViewDetail}>
            <i className="fas fa-shopping-cart"></i> View Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
