import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ShopSidebar from "../components/ShopSidebar";
import ProductsList from "../components/ProductsList";
import "./ShopPage.css";

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };
  return (
    <div className="shop-page">
      <Navbar />

   
      <Banner />

      
      <div className="shop-content">
        <div className="shop-left">
          <ShopSidebar
          onSelectCategory={handleSelectCategory}
            activeCategory={activeCategory}
          />
        </div>

        <div className="shop-right">
          
          <ProductsList page="shop" activeCategory={activeCategory} />
        </div>
      </div>


    </div>
  );
};

export default ShopPage;
