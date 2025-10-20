import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_CART } from "../store/actionTypes";
import { formatPrice } from "../components/FormatPrice";
import ProductItem from "../components/ProductItem";
import Navbar from "../components/Navbar";
import "./ProductDetail.css"; 

const API_URL =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  
 
  const showRelatedProducts = relatedProducts.length > 0;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const selectedProduct = data.find((p) => p._id.$oid === id);
        
        if (!selectedProduct) {
          setError("Không tìm thấy sản phẩm với ID: " + id);
          setLoading(false);
          return;
        }
        
        setProduct(selectedProduct);
    
        const related = data.filter(
          (p) => p.category === selectedProduct.category && p._id.$oid !== id
        );
        setRelatedProducts(related);

        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu sản phẩm.");
        setLoading(false);
      }
    };
    setQuantity(1);
    fetchProducts();
  }, [id]);
  const handleAddToCart = () => {
    if (!product) return;
    const finalQuantity = parseInt(quantity);

    if (finalQuantity <= 0) {
        alert('Số lượng sản phẩm phải lớn hơn 0.');
        setQuantity(1);
        return;
    }
    dispatch({
        type: ADD_CART,
        payload: {
          product: { 
                id: product._id.$oid,
                name: product.name,
                price: product.price,
                img: product.img1,
                }, 
            quantity: finalQuantity
        }
    });
    alert(`Đã thêm ${finalQuantity} sản phẩm ${product.name} vào giỏ hàng!`);
    setQuantity(1);
  };
  if (loading) return <div className="product-detail">Đang tải sản phẩm...</div>;
  if (error) return <div className="product-detail error-message">{error}</div>;
  if (!product) return <div className="product-detail">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-content">
          <Navbar/>
        <div className="product-main">
          <div className="product-thumbnails">
            <div className="thumbnail-item">
                <img src={product.img1} alt={`${product.name} thumbnail 1`} />
            </div>
            {product.img2 && (
                <div className="thumbnail-item">
                    <img src={product.img2} alt={`${product.name} thumbnail 2`} />
                </div>
            )}
            {product.img3 && (
                <div className="thumbnail-item">
                    <img src={product.img3} alt={`${product.name} thumbnail 3`} />
                </div>
            )}
            {product.img4 && (
                <div className="thumbnail-item">
                    <img src={product.img4} alt={`${product.name} thumbnail 4`} />
                </div>
            )}
          </div>
          <div className="product-image">
            <img src={product.img1} alt={product.name} /> 
          </div>
          <div className="product-summary-info">

            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
            <p className="product-category">CATEGORY: {product.category}</p>
            <p className="product-short-desc">{product.short_desc}</p>
            <div className="quantity-and-cart">
                <div className="quantity-input-wrapper">
                    <label htmlFor="quantity">Quality:</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        min="1" 
                        className="quantity-input" 
                    />
                </div>
                <button 
                  className="add-to-cart-button" 
                  onClick={handleAddToCart}
                >
                 Add to Cart
                </button>
            </div>
          </div>
          
        </div> 
      
        <div className="product-detail-bottom">
          <div className="product-long-desc">
            <h3>Chi tiết sản phẩm</h3>
            <p>{product.long_desc}</p>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {showRelatedProducts && (
            <div className="related-products">
              <h2>Related Product</h2>
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <ProductItem key={relatedProduct._id.$oid} product={relatedProduct} />
                ))}
              </div>
            </div>
        )}
        
      </div>
    </div>
  );
};

export default ProductDetail;