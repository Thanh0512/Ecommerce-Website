import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import ProductsList from '../components/ProductsList';
import Infor from '../components/Infor'
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
       <Navbar />
      <Banner />
      <Categories/>
      <ProductsList page="home" />
      <Infor />
        <Footer />
    </div>
  );
};

export default HomePage;