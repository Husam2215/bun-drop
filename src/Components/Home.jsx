import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css';  

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="customer-choice">Kundernas Favorit</div>
      <div className="image-container">
        <img src="/images/Newton Burger.webp" alt="Newton Burger" />
      </div>
      <Link to="/menu">
        <button className='order-btn'>Beställ Här</button>
      </Link>
    </div>
  );
};

export default HomePage;
