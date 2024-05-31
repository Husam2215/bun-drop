// src/Components/OrderPage.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../App';
import './Order.css';

const OrderPage = () => {
  const { orderItems } = useContext(OrderContext);

  return (
    <div className="order-container">
      <h2>Order</h2>
      {orderItems.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <div className="order-items">
          {orderItems.map((item, index) => (
            <div key={index} className="order-item">
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
