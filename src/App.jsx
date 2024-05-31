// src/App.jsx
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home.jsx';
import MenuPage from './Components/Menu.jsx';
import OrderPage from './Components/Order.jsx';

export const OrderContext = createContext();

const App = () => {
  const [menuItems, setMenuItems] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    fetch('db.json')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const addToOrder = (item) => {
    setOrderItems(prevOrderItems => [...prevOrderItems, item]);
  };

  return (
    <OrderContext.Provider value={{ orderItems, addToOrder }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage menuItems={menuItems} />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Router>
    </OrderContext.Provider>
  );
};

export default App;
