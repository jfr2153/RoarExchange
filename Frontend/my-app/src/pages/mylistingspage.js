import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import nailartImage from '../listingimages/nailart1.jpg'; // Import hardcoded image

function MyListingsPage() {
  const [myListings, setMyListings] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hardcoded default service for @janedoe
  const hardcodedService = {
    id: 'nailart',
    title: 'Glam Nails by Jane',
    user: '@janedoe',
    description: 'Elevate your style with custom nail art!',
    shortDescription: 'Elevate your style with custom nail art!',
    price: '$30 per session',
    location: 'East Dorm',
    image: nailartImage,
  };

  useEffect(() => {
    // Fetch user-created listings from localStorage
    const storedServices = JSON.parse(localStorage.getItem('services')) || [];
    const userListings = storedServices.filter((service) => service.user === '@janedoe');

    // Ensure the hardcoded service always appears
    const uniqueListings = [hardcodedService, ...userListings];
    setMyListings(uniqueListings);
  }, []);

  // Toggle dropdown visibility
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

      {/* My Listings Section */}
      <div className="section">
        <h2>My Listings</h2>
        <div className="profile-grid">
          {myListings.length > 0 ? (
            myListings.map((listing) => (
              <div key={listing.id} className="profile-card">
                <Link to={`/listing/${listing.id}`}>
                  <div
                    className="profile-card-image"
                    style={{
                      backgroundImage: `url(${listing.image || './listingimages/default.jpg'})`,
                    }}
                  ></div>
                  <div className="profile-card-content">
                    <div className="card-text-user">{listing.user || '@unknown'}</div>
                    <div className="card-text">{listing.title || 'No Title'}</div>
                    <div className="card-text-small">
                      {listing.shortDescription || 'No description available.'}
                    </div>
                    <span className="service-icon">
                      <br /> 🪞
                    </span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No listings available. Add your first listing!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyListingsPage;