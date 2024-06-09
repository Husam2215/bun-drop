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
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setSwishNumberError(''); 
    setCardDetailsError('');
    setNameError('');
    setLastNameError('');
    setAddressError('');
  };

  const handleSwishNumberChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Endast siffror går att skriva in
    setSwishNumber(value);
    if (value.length !== 10) {
      setSwishNumberError('Swish number must be 10 digits.');
    } else {
      setSwishNumberError('');
    }
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; 
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    if (name === 'cardNumber' && value.length !== 16) {
      setCardDetailsError('Card number must be 16 digits.');
    } else if (name === 'expiryDate' && value.length !== 4) {
      setCardDetailsError('Expiry date must be 4 digits (MMYY).');
    } else if (name === 'cvv' && value.length !== 3) {
      setCardDetailsError('CVV must be 3 digits.');
    } else {
      setCardDetailsError('');
    }
  };

  const handleConfirmPurchase = () => {
    let valid = true;
    if (!name) {
      setNameError('Please enter your first name.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!lastName) {
      setLastNameError('Please enter your last name.');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (!address) {
      setAddressError('Please enter your address.');
      valid = false;
    } else {
      setAddressError('');
    }

    if (paymentMethod === 'swish' && swishNumber.length !== 10) {
      setSwishNumberError('Swish number must be 10 digits.');
      valid = false;
    } else {
      setSwishNumberError('');
    }

    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      if (cardNumber.length !== 16 || expiryDate.length !== 4 || cvv.length !== 3) {
        setCardDetailsError('Please fill in all card details correctly.');
        valid = false;
      } else {
        setCardDetailsError('');
      }
    }

    if (!valid) return;

    const deliveryTime = Math.floor(Math.random() * 21) + 20; // Random tid mellan 20 o 40 min
    console.log('Navigating to confirmation page with:', {
      orderItems,
      totalCost,
      deliveryTime,
      name,
      lastName,
      address
    });

    navigate('/confirmation', {
      state: {
        orderItems,
        totalCost,
        deliveryTime,
        name,
        lastName,
        address
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
          {paymentMethod && (
            <>
              <div className="personal-details">
                <h3>Enter your details:</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                />
                {nameError && <p className="error-message">{nameError}</p>}
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                {lastNameError && <p className="error-message">{lastNameError}</p>}
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
                {addressError && <p className="error-message">{addressError}</p>}
              </div>
            </>
          )}
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
                placeholder="Expiry Date (MMYY)"
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
          {paymentMethod && (
            <button
              className="confirm-btn"
              onClick={handleConfirmPurchase}
            >
              Confirm Purchase
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
