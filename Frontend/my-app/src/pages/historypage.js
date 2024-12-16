import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import jacketImage from '../listingimages/jacket.jpg';
import braceletImage from '../listingimages/bracelet.jpg';
import pieImage from '../listingimages/pie.jpg';

function HistoryPage() {
  const [savedItems, setSavedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load saved items from localStorage when the component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedItems')) || [];
    // Ensure shortDescription is included for all saved items
    const updatedSaved = saved.map((item) => ({
      ...item,
      shortDescription: item.shortDescription || item.description || 'No description available.',
    }));
    setSavedItems(updatedSaved);
  }, []);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="container-profile">
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <Link to="/">
            <img src="logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-item profile">
          <div className="dropdown">
            <img
              src="profile-icon.png"
              alt="Profile"
              className="profile-img"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
                <li>
                  <Link to="/mylistings">Postings</Link>
                </li>
                <li>
                  <Link to="/">Log Out</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome">
        <h1>Hello, Jane Doe!</h1>
      </div>

      <hr className="section-divider-profile" />

      {/* Past Orders Section */}
      <div className="section">
        <h2>Previous Product Orders</h2>
        <div className="profile-grid">
          <div className="profile-card">
            <div
              className="profile-card-image"
              style={{ backgroundImage: `url(${jacketImage})` }}
            ></div>
            <div className="profile-card-content">
              <div className="card-text-user">@davidthelion3</div>
              <div className="card-text">Yankees Vintage Jacket</div>
              <div className="card-text-small">
                Owned for 2 years. Size M. Runs large. $150 but hmu to negotiate or smt.
              </div>
              <span className="service-icon">
                <br /> 👕 🪞
              </span>
            </div>
          </div>
          <div className="profile-card">
            <div
              className="profile-card-image"
              style={{ backgroundImage: `url(${braceletImage})` }}
            ></div>
            <div className="profile-card-content">
              <div className="card-text-user">@roseypine</div>
              <div className="card-text">Silver Dior Bracelet</div>
              <div className="card-text-small">
                $250. Fits on a variety of wrists but feel free to reach out if you want to try it on before purchasing!
              </div>
              <span className="service-icon">
                <br /> 👕
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Past Services Section */}
      <div className="section">
        <h2>Previous Service Orders</h2>
        <div className="profile-grid">
          <div className="profile-card">
            <div
              className="profile-card-image"
              style={{ backgroundImage: `url(${pieImage})` }}
            ></div>
            <div className="profile-card-content">
              <div className="card-text-user">@madeline32</div>
              <div className="card-text">Madé's Pies 🥧</div>
              <div className="card-text-small">
                Got a sweet tooth? I serve the best pies @ Columbia! Now serving s'mores pie!
              </div>
              <span className="service-icon">
                <br /> 🍴
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Items Section */}
      <div className="section">
        <h2>Saved Items</h2>
        <div className="profile-grid">
          {savedItems.length > 0 ? (
            savedItems.map((item, index) => (
              <div key={item.id || index} className="profile-card">
                <div
                  className="profile-card-image"
                  style={{ backgroundImage: `url(${item.image || './listingimages/default.jpg'})` }}
                ></div>
                <div className="profile-card-content">
                  <div className="card-text-user">@{item.user || 'Unknown'}</div>
                  <div className="card-text">{item.title || 'No Title'}</div>
                  <div className="card-text-small">
                    {item.shortDescription || 'No description available.'}
                  </div>
                  <span className="service-icon">
                    <br /> 🍴
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No saved items yet. Save some services to see them here!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;