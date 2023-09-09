import React, { useState } from 'react';
import "../styles/checkout.css"

const Checkout = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expirationDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform payment processing logic here
        // You can use a payment gateway library or make an API call to process the payment
        console.log('Payment info submitted:', paymentInfo);
        // Reset the form after successful payment
        setPaymentInfo({
            cardNumber: '',
            cardName: '',
            expirationDate: '',
            cvv: '',
        });
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout Page</h1>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="checkout-input">
                    <label htmlFor="cardNumber" className="checkout-label">Card Number:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleInputChange}
                        className="checkout-text-input"
                        required
                    />
                </div>
                <div className="checkout-input">
                    <label htmlFor="cardName" className="checkout-label">Cardholder Name:</label>
                    <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handleInputChange}
                        className="checkout-text-input"
                        required
                    />
                </div>
                <div className="checkout-input">
                    <label htmlFor="expirationDate" className="checkout-label">Expiration Date:</label>
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={paymentInfo.expirationDate}
                        onChange={handleInputChange}
                        className="checkout-text-input"
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div className="checkout-input">
                    <label htmlFor="cvv" className="checkout-label">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange}
                        className="checkout-text-input"
                        required
                    />
                </div>
                <button type="submit" className="checkout-button">Submit Payment</button>
            </form>
        </div>
    );
};

export default Checkout;
