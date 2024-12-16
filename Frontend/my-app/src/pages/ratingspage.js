import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles.css';

function RatingsPage() {
  const location = useLocation();
  const { rating, totalRatings, splits } = location.state || {
    rating: 0,
    totalRatings: 0,
    splits: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  };

  // Local state to manage ratings and input
  const [currentRating, setCurrentRating] = useState(rating);
  const [currentTotalRatings, setCurrentTotalRatings] = useState(totalRatings);
  const [currentSplits, setCurrentSplits] = useState(splits);
  const [selectedRating, setSelectedRating] = useState(''); // Dropdown selection

  // Function to handle rating submission
  const handleSubmitRating = () => {
    if (!selectedRating) {
      alert('Please select a rating before submitting.');
      return;
    }

    const newSplits = { ...currentSplits };
    newSplits[selectedRating] = (newSplits[selectedRating] || 0) + 1;

    const newTotalRatings = currentTotalRatings + 1;
    const newScore =
      Object.entries(newSplits).reduce(
        (acc, [star, count]) => acc + star * count,
        0
      ) / newTotalRatings;

    setCurrentSplits(newSplits);
    setCurrentTotalRatings(newTotalRatings);
    setCurrentRating(newScore.toFixed(1)); // Round to 1 decimal

    setSelectedRating(''); // Reset dropdown
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-item profile">
          <img src="/profile-icon.png" alt="Profile" className="profile-img" />
        </div>
      </nav>

      <h1 className="page-title">Ratings</h1>

      {/* Top Rating Box */}
      <div className="rating-box">
        <div className="rating-score">{currentRating} / 5</div>
        <div className="stars">
          {'★'.repeat(Math.round(currentRating))}
          {'☆'.repeat(5 - Math.round(currentRating))}
        </div>
        <div className="rating-count">{currentTotalRatings} ratings</div>
      </div>

      {/* Rating Splits */}
      <div className="rating-bars">
        {Object.keys(currentSplits)
          .reverse()
          .map((key) => (
            <div className="bar-row" key={key}>
              <span className="bar-label">{key}/5</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(currentSplits[key] / currentTotalRatings) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="bar-value">{currentSplits[key]}</span>
            </div>
          ))}
      </div>

      {/* Submit a Rating */}
      <div className="form-group">
        <label htmlFor="rating">Rate this service:</label>
        <select
          id="rating"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">Select a rating</option>
          <option value="5">5/5</option>
          <option value="4">4/5</option>
          <option value="3">3/5</option>
          <option value="2">2/5</option>
          <option value="1">1/5</option>
        </select>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-primary btn-rating"
          onClick={handleSubmitRating}
        >
          Submit a Rating
        </button>
      </div>
    </div>
  );
}

export default RatingsPage;