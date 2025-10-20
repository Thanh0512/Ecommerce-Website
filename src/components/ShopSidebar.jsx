import React from "react";
import "./ShopSidebar.css";

const ShopSidebar = ({ onSelectCategory, activeCategory }) => {
  const categories = [
    {
      title: "APPLE",
      items: ["All"],
    },
    {
      title: "IPHONE & MAC",
      items: ["iPhone", "iPad", "Macbook"],
    },
    {
      title: "WIRELESS",
      items: ["Airpod", "Watch"],
    },
    {
      title: "OTHER",
      items: ["Mouse", "Keyboard", "Other"],
    },
  ];

  return (
    <div className="shop-sidebar">
      {categories.map((section, index) => (
        <div key={index} className="sidebar-section">
          <h3 className={`sidebar-title ${index === 0 ? "apple-title" : ""}`}>
            {section.title}
          </h3>
          <ul>
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className={activeCategory === item ? "active" : ""}
                onClick={() => onSelectCategory(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShopSidebar;
