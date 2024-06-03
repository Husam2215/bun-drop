import React, { useContext, useState } from 'react';
import { OrderContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const CheckoutPage = () => {
  const { orderItems, totalCost } = useContext(OrderContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [swishNumber, setSwishNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [swishNumberError, setSwishNumberError] = useState('');
  const [cardDetailsError, setCardDetailsError] = useState('');
  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setSwishNumberError(''); // Reset errors
    setCardDetailsError('');
  };

  const handleSwishNumberChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Ensure only numeric input
    setSwishNumber(value);
    if (value.length !== 10) {
      setSwishNumberError('Swish number must be 10 digits.');
    } else {
      setSwishNumberError('');
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; // Ensure only numeric input
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleConfirmPurchase = () => {
    if (paymentMethod === 'swish' && swishNumber.length !== 10) {
      setSwishNumberError('Swish number must be 10 digits.');
      return;
    }

    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      if (!cardNumber || !expiryDate || !cvv) {
        setCardDetailsError('Please fill in all card details.');
        return;
      }
    }

    const deliveryTime = Math.floor(Math.random() * 21) + 20; // Random time between 20 and 40 minutes
    console.log('Navigating to confirmation page with:', {
      orderItems,
      totalCost,
      deliveryTime
    });

    navigate('/confirmation', {
      state: {
        orderItems,
        totalCost,
        deliveryTime,
      }
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {orderItems.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <div className="checkout-items">
          {orderItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} />
              <p>{item.description}</p>
              <p><strong>{item.price} Sek</strong></p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="total-cost">
            <h3>Total Cost: {totalCost.toFixed(0)} Sek</h3>
          </div>
          <div className="payment-method">
            <h3>Choose Payment Method:</h3>
            <button onClick={() => handlePaymentMethodChange('swish')}>Swish</button>
            <button onClick={() => handlePaymentMethodChange('card')}>Card</button>
          </div>
          {paymentMethod === 'swish' && (
            <div className="swish-payment">
              <h4>Enter Swish Number:</h4>
              <input
                type="text"
                value={swishNumber}
                onChange={handleSwishNumberChange}
                placeholder="Swish Number"
                maxLength={10}
              />
              {swishNumberError && <p className="error-message">{swishNumberError}</p>}
            </div>
          )}
          {paymentMethod === 'card' && (
            <div className="card-payment">
              <h4>Enter Card Details:</h4>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                placeholder="Card Number"
                maxLength={16}
              />
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                placeholder="Expiry Date (MM/YY)"
                maxLength={4}
              />
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                placeholder="CVV"
                maxLength={3}
              />
              {cardDetailsError && <p className="error-message">{cardDetailsError}</p>}
            </div>
          )}
          <button className="confirm-btn" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
