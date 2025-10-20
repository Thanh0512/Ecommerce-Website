import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 1, name: 'Iphone', image: '/product_1.png' },
    { id: 2, name: 'Mac', image: '/product_2.png' },
    { id: 3, name: 'Ipad', image: '/product_3.png' },
    { id: 4, name: 'Watch', image: '/product_4.png' },
    { id: 5, name: 'Airpods', image: '/product_5.png' },
  ];

  const handleCategoryClick = (category) => {
    navigate('/shop', { state: { category } });
  };

  return (
    <div className="categories-section">
      <p className='title'>CAREFULLY CREATED COLLECTIONS</p>
      <h3 className="section-title">BROWSE OUR CATEGORIRES</h3>
      <div className="categories-list">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-item"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;