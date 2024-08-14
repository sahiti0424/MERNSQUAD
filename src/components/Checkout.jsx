import React, { useState } from 'react';
import Header from './Header';

const OrderForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedUpiMethod, setSelectedUpiMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null); // New state for order summary

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip'];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });
    return errors;
  };

  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const handleCompletePurchase = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowOrderDetails(true);
      setShowPaymentMethod(true);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'UPI') {
      setShowPaymentOptions(true);
    } else {
      setShowPaymentOptions(false);
    }
  };

  const handleUpiMethodChange = (e) => {
    setSelectedUpiMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'COD') {
      const orderDetails = {
        items: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
        total: '$84.00',
        address: formData,
        paymentMethod: 'Cash On Delivery',
      };
      setOrderSummary(orderDetails);
      console.log('Order placed with COD');
    } else if (paymentMethod === 'UPI') {
      if (selectedUpiMethod) {
        console.log(`Order placed with UPI using ${selectedUpiMethod}`);
      } else {
        console.log('Please select a UPI payment method');
      }
    } else {
      console.log('Please select a payment method');
    }
  };

  return (
    <div>
      <Header />
      <div style={{ fontFamily: 'sans-serif', backgroundColor: 'white', padding: '32px' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          {/* Billing Section */}
          <div
            style={{
              background: 'linear-gradient(to right, #333333, #4a4a4a, #333333)',
              padding: '32px',
              borderRadius: '8px',
              minWidth: '350px',
              color: 'white',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Your Cart</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Product Items */}
              {['Product 1', 'Product 2', 'Product 3', 'Product 4'].map((product, index) => (
                <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '96px',
                      height: '112px',
                      display: 'flex',
                      padding: '12px',
                      backgroundColor: '#d1d5db',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={`https://readymadeui.com/images/product${index + 10}.webp`}
                      alt={product}
                      style={{ width: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '16px' }}>{product}</h3>
                    <ul style={{ fontSize: '12px', color: '#d1d5db', marginTop: '8px' }}>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>Size <span>37</span></li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>Quantity <span>2</span></li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>Total Price <span>$40</span></li>
                    </ul>
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: '32px',
                  paddingTop: '16px',
                  borderTop: '1px solid #4a4a4a',
                }}
              >
                <h4 style={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  Total <span>$84.00</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Order Form Section */}
          <div
            style={{
              maxWidth: '600px',
              width: '100%',
              padding: '32px',
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333' }}>Complete your order</h2>
            <form style={{ marginTop: '32px' }}>
              <div>
                <h3 style={{ fontSize: '16px', color: '#333333', marginBottom: '16px' }}>Personal Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.firstName && <span style={{ color: 'red' }}>{formErrors.firstName}</span>}
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.lastName && <span style={{ color: 'red' }}>{formErrors.lastName}</span>}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.phone && <span style={{ color: 'red' }}>{formErrors.phone}</span>}
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '16px', color: '#333333', marginBottom: '16px' }}>Shipping Details</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.address && <span style={{ color: 'red' }}>{formErrors.address}</span>}
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.city && <span style={{ color: 'red' }}>{formErrors.city}</span>}
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.state && <span style={{ color: 'red' }}>{formErrors.state}</span>}
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      color: '#333333',
                      width: '100%',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                  {formErrors.zip && <span style={{ color: 'red' }}>{formErrors.zip}</span>}
                </div>
              </div>

              {/* Complete Purchase Button */}
              <button
                type="button"
                onClick={handleCompletePurchase}
                disabled={!isFormValid()}
                style={{
                  marginTop: '32px',
                  padding: '12px 24px',
                  backgroundColor: isFormValid() ? '#4a4a4a' : '#d1d5db',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  width: '100%',
                }}
              >
                Complete Purchase
              </button>
            </form>

            {/* Payment Method Selection */}
            {showPaymentMethod && (
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '16px', color: '#333333', marginBottom: '16px' }}>Payment Method</h3>
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={handlePaymentMethodChange}
                    />{' '}
                    Cash On Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={handlePaymentMethodChange}
                    />{' '}
                    UPI Payment
                  </label>
                </div>

                {/* UPI Payment Options */}
                {showPaymentOptions && (
                  <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontSize: '16px', color: '#333333', marginBottom: '16px' }}>Choose UPI Payment Method</h3>
                    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                      <label>
                        <input
                          type="radio"
                          name="upiMethod"
                          value="PhonePe"
                          checked={selectedUpiMethod === 'PhonePe'}
                          onChange={handleUpiMethodChange}
                        />{' '}
                        PhonePe
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="upiMethod"
                          value="Google Pay"
                          checked={selectedUpiMethod === 'Google Pay'}
                          onChange={handleUpiMethodChange}
                        />{' '}
                        Google Pay
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="upiMethod"
                          value="Paytm"
                          checked={selectedUpiMethod === 'Paytm'}
                          onChange={handleUpiMethodChange}
                        />{' '}
                        Paytm
                      </label>
                    </div>
                  </div>
                )}
                <button
                  onClick={handlePlaceOrder}
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    backgroundColor: '#4a4a4a',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      {orderSummary && (
        <div style={{ marginTop: '32px', padding: '32px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333333' }}>Order Summary</h3>
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ fontSize: '18px', color: '#333333' }}>Items:</h4>
            <ul>
              {orderSummary.items.map((item, index) => (
                <li key={index} style={{ fontSize: '16px', color: '#333333' }}>{item}</li>
              ))}
            </ul>
            <h4 style={{ fontSize: '18px', color: '#333333', marginTop: '16px' }}>Total: {orderSummary.total}</h4>
            <h4 style={{ fontSize: '18px', color: '#333333', marginTop: '16px' }}>Payment Method: {orderSummary.paymentMethod}</h4>
            <h4 style={{ fontSize: '18px', color: '#333333', marginTop: '16px' }}>Shipping Address:</h4>
            <p style={{ fontSize: '16px', color: '#333333' }}>
              {orderSummary.address.firstName} {orderSummary.address.lastName}<br />
              {orderSummary.address.address}<br />
              {orderSummary.address.city}, {orderSummary.address.state} {orderSummary.address.zip}<br />
              {orderSummary.address.email}<br />
              {orderSummary.address.phone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
