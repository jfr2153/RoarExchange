import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import pieImage from '../listingimages/pie.jpg';
import barberImage from '../listingimages/barber.jpg';
import appleImage from '../listingimages/apple.jpg';
import nailartImage from '../listingimages/nailart1.jpg';

// Helper function to convert imported images to base64
const imageToBase64 = (image) => {
  return URL.createObjectURL(image);
};

function Homepage() {
  const [services, setServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]); // State for filtered results
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Hardcoded services with base64-encoded images
  const hardcodedServices = [
    {
      id: 'pie',
      title: "Madé's Pies 🥧",
      user: '@madeline32',
      description: "Got a sweet tooth? I serve the best pies @ Columbia! Now serving s'mores pie & keylime pie.",
      price: "$40 Whole Pie & $10 Per Slice",
      location: 'Wein Hall',
      longDescription: "Delicious, homemade pies available for pickup. Order in advance!",
      image: pieImage,
    },
    {
      id: 'barber',
      title: "Mike's Barbershop 💈",
      user: '@notchefmike',
      description: "I'm not chef mike but I do cook in the salon (my room). Book fast. Slots are filling up quick.",
      price: 'Contact for pricing',
      location: 'Mike’s Room',
      longDescription: "Offering professional barber services. Slots are limited, book fast!",
      image: barberImage,
    },
    {
      id: 'rizzlessons',
      title: 'Rizz Lessons 101 😏',
      user: '@thatguy92',
      description:
        'Certified in Rizzology. I will teach you how to win someone over in 30 seconds or less. Trust the process.',
      price: '$20 per lesson',
      location: 'Campus Center',
      longDescription: "Learn the art of Rizzology and build your confidence today!",
      image: appleImage,
    },
    {
      id: 'nailart',
      title: 'Glam Nails by Jane',
      user: '@janedoe',
      description: 'Elevate your style with custom nail art!',
      price: '$30 per session',
      location: 'East Dorm',
      longDescription: "Offering custom nail art for all occasions. DM for appointments!",
      image: nailartImage,
    },
  ];

  // Load services from LocalStorage and merge with hardcoded services
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services')) || [];

    // Filter out duplicates by ensuring unique IDs
    const uniqueServices = [
      ...hardcodedServices,
      ...storedServices.filter(
        (service) => !hardcodedServices.some((hardcoded) => hardcoded.id === service.id)
      ),
    ];

    setServices(uniqueServices);
    setFilteredServices(uniqueServices); // Initialize filtered services with all services
  }, []);

  // Update filtered services based on search input
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
    );

    setFilteredServices(filtered);
  };


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-item profile">
          <div className="dropdown">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="profile-img"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
            {isDropdownOpen && (
              <ul className="dropdown-menu" style={dropdownStyle}>
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

      <div className="top-section"></div>

      {/* Search Bar */}
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <img src="/search-icon.png" alt="Search Icon" className="search-icon" />
        </div>
      </div>

      <div className="btn-group">
        <Link to="/listingform" className="btn btn-primary btn-homepage" data-tooltip="Post">
          Post a Product or Service
        </Link>
      </div>

      {/* Section Title */}
      <h2 className="section-title">Trending</h2>
      <hr className="section-divider" />
      
      {/* Grid for Filtered Items */}
      <div className="highest-rated-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <Link to={`/listing/${service.id}`} key={service.id}>
              <div className="card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                <div className="card-text-user">{service.user}</div>
                <div className="card-text">{service.title}</div>
                <div className="card-text-small">{service.description}</div>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No results found.</p>
        )}
      </div>
    </div>
  );
}

const dropdownStyle = {
  position: 'absolute',
  top: '50px',
  right: '0',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '10px 0',
  zIndex: 1000,
  listStyle: 'none',
  minWidth: '150px',
};

export default Homepage;