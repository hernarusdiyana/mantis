import React, { useState } from 'react';

function RecommendationForm() {
  const [criteria, setCriteria] = useState({
    brand: '',
    model: '',
    processor: '',
    ram: '',
    storage: '',
    screen_size: '',
    battery: ''
  });

  const [recommendedPrice, setRecommendedPrice] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCriteria({
      ...criteria,
      [name]: value
    });
  };

  const fetchRecommendation = () => {
    fetch('http://localhost:5000/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criteria),
    })
      .then(response => response.json())
      .then(data => setRecommendedPrice(data.price))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h3>Recommendation Form</h3>
      <label>
        Brand:
        <input type="text" name="brand" value={criteria.brand} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Model:
        <input type="text" name="model" value={criteria.model} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Processor:
        <input type="text" name="processor" value={criteria.processor} onChange={handleChange} required />
      </label>
      <br />
      <label>
        RAM (GB):
        <input type="number" name="ram" value={criteria.ram} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Storage (GB):
        <input type="number" name="storage" value={criteria.storage} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Screen Size (inch):
        <input type="number" name="screen_size" value={criteria.screen_size} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Battery (mAh):
        <input type="number" name="battery" value={criteria.battery} onChange={handleChange} required />
      </label>
      <br />
      <button type="button" onClick={fetchRecommendation}>Get Recommendation</button>
      {recommendedPrice && <div>Recommended Price: ${recommendedPrice}</div>}
    </div>
  );
}

export default RecommendationForm;
