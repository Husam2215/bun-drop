import React from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmation.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const state = location.state || {};
  const { orderItems = [], totalCost = 0, deliveryTime = 0, name = '', lastName = '', address = '' } = state;

  return (
    <div className="confirmation-container">
      <h2>Thank you for your purchase!</h2>
      <p>Your order has been confirmed.</p>
      <p>Estimated delivery time: {deliveryTime} minutes.</p>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {name} {lastName}</p>
      <p><strong>Address:</strong> {address}</p>
      <h3>Order Summary</h3>
      <div className="order-items-container">
        {orderItems.map((item) => (
          <div key={item.id} className="order-item">
            <h4>{item.title}</h4>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <p><strong>{item.price} Sek</strong></p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <h3>Total Cost: <strong>{totalCost.toFixed(0)} Sek</strong></h3>
    </div>
  );
};

export default ConfirmationPage;
