import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { OrderContext } from '../App';

const MenuPage = ({ menuItems }) => {
  const { addToOrder } = useContext(OrderContext);
  const [title, setTitle] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (menuItems.title) {
      setTitle(menuItems.title === "Menu" ? "Burger" : menuItems.title);
    }
  }, [menuItems]);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToOrder = (item) => {
    addToOrder(item);
  };

  return (
    <div className="menu-container">
      <div className="header">
        <h1>{title}</h1>
        <div className="order-button-container">
          <Link to="/order">
            <button className='watch-order'>See Order</button>
          </Link>
        </div>
      </div>
      <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilters && (
        <div className="filter-buttons">
          <button onClick={() => handleFilterClick('All')}>All</button>
          <button onClick={() => handleFilterClick('Burgers')}>Burgers</button>
          <button onClick={() => handleFilterClick('Fries')}>Fries</button>
          <button onClick={() => handleFilterClick('Dip')}>Dips</button>
          <button onClick={() => handleFilterClick('Drinks')}>Drinks</button>
        </div>
      )}
      {Object.keys(menuItems).map(category => (
        (selectedCategory === 'All' || selectedCategory === category) && (
          <div key={category} className="category-container">
            <h2 className="category-title">{category}</h2>
            <div className="menu-items">
              {menuItems[category].map((item) => (
                <div key={item.id} className="menu-item">
                  <h3>{item.title}</h3>
                  <button className="menu-item-button" onClick={() => handleAddToOrder(item)}>
                    <img src={item.image} alt={item.title} />
                  </button>
                  <p className="menu-item-description">{item.description}</p>
                  <p>{item.price}</p>
                  <button className="order-button" onClick={() => handleAddToOrder(item)}>Order</button>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default MenuPage;
