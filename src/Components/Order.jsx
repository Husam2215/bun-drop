import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../App';
import './Order.css';

const OrderPage = () => {
  const { orderItems, removeFromOrder, updateItemQuantity } = useContext(OrderContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalCost(total);
    };

    calculateTotalCost();
  }, [orderItems]);

  const handleRemoveItem = (itemId) => {
    removeFromOrder(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromOrder(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="order-container">
      <h2>Order</h2>
      {orderItems.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <div className="order-items">
          {orderItems.map((item) => (
            <div key={item.id} className="order-item">
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>
              <p><strong>{item.price} Sek</strong></p>
              <p>Quantity: 
                <input 
                  type="number" 
                  min="0" 
                  max="50" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="total-cost">
            <h3>Total Cost: {totalCost.toFixed(0)} Sek</h3>
          </div>
          <Link to="/checkout">
            <button className="checkout-btn">Payment</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
