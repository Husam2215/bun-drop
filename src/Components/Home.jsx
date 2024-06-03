import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css';  

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="favorites">
        <div className="original favorite-item">
          <h3>Customer Favorite</h3>
          <p>Orginal Burger</p> 
          <img src="/images/Orginal.jpg" alt="Original" />
        </div>
        <div className="spicy favorite-item">
          <h3>Customer Favorite</h3>
          <p>Spicy Avocado Burger</p> 
          <img src="/images/Spicy Avocado.jpg" alt="Spicy Avocado" />
        </div>
      </div>
      <div className="image-container">
        <img src="/images/Newton Burger.webp" alt="Newton Burger" />
      </div>
      <Link to="/menu">
        <button className='order-btn'>Order Here</button>
      </Link>
    </div>
  );
};

export default HomePage;
