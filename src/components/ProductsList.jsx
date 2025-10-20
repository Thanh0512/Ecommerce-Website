import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import ProductPopup from "./ProductPopup";
import "./ProductsList.css";

const API_URL =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

const ProductsList = ({ page, activeCategory = "All" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log("Dữ liệu sản phẩm từ API:", data); // Debug dữ liệu API
        setProducts(page === "home" ? data.slice(0, 8) : data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) return <div className="products-section">Đang tải sản phẩm...</div>;
  if (error) return <div className="products-section error-message">Lỗi: {error}</div>;

  // Lọc sản phẩm dựa trên activeCategory và searchTerm
  let filteredProducts = products
    .filter((p) => {
      const isMatch = activeCategory === "All" || p.category.toLowerCase() === (activeCategory || "").toLowerCase();
      console.log(`Sản phẩm: ${p.name}, Category: ${p.category}, Active: ${activeCategory}, Kết quả: ${isMatch}`);
      return isMatch;
    })
    .filter((p) => {
      const isSearchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      console.log(`Sản phẩm: ${p.name}, Search Term: ${searchTerm}, Kết quả tìm kiếm: ${isSearchMatch}`);
      return isSearchMatch;
    });

  console.log("Active Category:", activeCategory);
  console.log("Search Term:", searchTerm);
  console.log("Filtered Products:", filteredProducts);

  // Sắp xếp sản phẩm
  if (sortType === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortType === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortType === "name-asc") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sortType === "name-desc") filteredProducts.sort((a, b) => b.name.localeCompare(b.name));

  return (
    <section className={`products-section ${page}`}>
      {page === "home" ? (
        <div className="header-text">
          <p className="sub-heading">MADE THE HARD WAY</p>
          <h2 className="main-heading">TOP TRENDING PRODUCTS</h2>
        </div>
      ) : (
        <div className="shop-toolbar">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm("")}>Xóa tìm kiếm</button>
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Sắp xếp mặc định</option>
            <option value="price-asc">Giá: Tăng dần</option>
            <option value="price-desc">Giá: Giảm dần</option>
            <option value="name-asc">Tên: A → Z</option>
            <option value="name-desc">Tên: Z → A</option>
          </select>
        </div>
      )}

      <div className="products-list-grid" id="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product._id.$oid} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>

      <ProductPopup />
    </section>
  );
};

ProductsList.propTypes = {
  page: PropTypes.string.isRequired,
  activeCategory: PropTypes.string,
};

ProductsList.defaultProps = {
  activeCategory: "All",
};

export default ProductsList;