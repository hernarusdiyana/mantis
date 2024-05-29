import React, { useState } from 'react';
import RecommendationForm from './RecommendationForm';

function MainForm() {
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendation = (rec) => {
    setRecommendation(rec);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit the main form data along with recommendation
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Purchase Requisition</h2>
      <label>
        Item Name:
        <input type="text" name="itemName" required />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" required />
      </label>
      <RecommendationForm onRecommend={handleRecommendation} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MainForm;
