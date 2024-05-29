import React, { useState, useEffect } from 'react';
import './Menu.css'; 

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState({});
  const [title, setTitle] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('db.json') 
      .then(response => response.json())
      .then(data => {
        setMenuItems(data);
        setTitle(data.title === "Menu" ? "Burger" : data.title); // Använd "Burger" istället för "Menu"
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="menu-container">
      <h1>{title}</h1>
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
                  <button className="menu-item-button">
                    <img src={item.image} alt={item.title} />
                  </button>
                  <p className="menu-item-description">{item.description}</p>
                  <p>{item.price}</p>
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
