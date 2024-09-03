// src/WorldpayForm.js
import React, { useState } from 'react';
import axios from 'axios';

const WorldpayForm = () => {
  const [cardDetails, setCardDetails] = useState({
    number: '4000000000001091',
    expiryMonth: '03',
    expiryYear: '2026',
    cvv: '555',
    holdername: 'John Doe'
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const verifiedTokens = async (e) => {
    //e.preventDefault();

try {
    const result = await axios.post(
      'http://localhost:3001/api/worldpay/verifiedTokens',
      cardDetails,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(console.log("3rd API res: " + response));
    
    setResponse(result.data);
    setError(null);
    
  } catch (err) {
    setError('An error occurred while processing the payment.');
    console.log(err);
    setResponse(null);
  }

};


  const cvc = async (e) => {
        //e.preventDefault();

    try {
        const result = await axios.post(
          'http://localhost:3001/api/worldpay/cvc',
          cardDetails,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(verifiedTokens());
        
        setResponse(result.data);
        setError(null);
        
      } catch (err) {
        setError('An error occurred while processing the payment.');
        console.log(err);
        setResponse(null);
      }

  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        'http://localhost:3001/api/worldpay',
        cardDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(cvc());
      
      setResponse(result.data);
      setError(null);
      
    } catch (err) {
      setError('An error occurred while processing the payment.');
      console.log(err);
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Submit Payment Details 4000000000001091</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="number"
            value={cardDetails.number}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Expiry Month:
          <input
            type="text"
            name="expiryMonth"
            value={cardDetails.expiryMonth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Expiry Year:
          <input
            type="text"
            name="expiryYear"
            value={cardDetails.expiryYear}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CardHolderName:
          <input
            type="text"
            name="holdername"            
            value={cardDetails.holdername}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <div>Response: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default WorldpayForm;
