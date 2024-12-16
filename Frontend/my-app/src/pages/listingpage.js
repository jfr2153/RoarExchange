import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

// Import hardcoded images
import pieImage from '../listingimages/pie.jpg';
import barberImage from '../listingimages/barber.jpg';
import appleImage from '../listingimages/apple.jpg';
import nailartImage from '../listingimages/nailart1.jpg';
import sellerProfileImage from '../profilelogo2.png'; // Import seller profile image

function ListingPage() {
  const { id } = useParams(); // Extract the ID from the URL
  const [service, setService] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Hardcoded services as fallback
  const hardcodedServices = [
    {
      id: 'pie',
      title: "Madé's Pies 🥧",
      user: '@madeline32',
      description: "Got a sweet tooth? I serve the best pies @ Columbia! Now serving s'mores pie & keylime pie.",
      price: "$40 Whole Pie & $10 Per Slice",
      location: 'Wein Hall',
      longDescription: "Delicious, homemade pies available for pickup. Order in advance!",
      image: pieImage, // Hardcoded image
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
      description: 'Certified in Rizzology. I will teach you how to win someone over in 30 seconds or less.',
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

  useEffect(() => {
    // Fetch services from localStorage
    const services = JSON.parse(localStorage.getItem('services')) || [];
    let selectedService = services.find((item) => item.id === id);

    // If not found in localStorage, check hardcoded services
    if (!selectedService) {
      selectedService = hardcodedServices.find((item) => item.id === id);
    }

    setService(selectedService || null);

    // Check if the service is already saved
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    setIsSaved(savedItems.some((item) => item.id === id));
  }, [id]);

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
  
    if (!isSaved) {
      // Ensure the image path is correct
      const itemToSave = {
        ...service,
        image: service.image.startsWith('data:') ? service.image : service.image || pieImage,
      };
  
      savedItems.push(itemToSave);
      localStorage.setItem('savedItems', JSON.stringify(savedItems));
      setIsSaved(true);
    }
  };
  

  if (!service) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Service not found!</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </a>
        </div>
        <div className="nav-item profile">
          <div className="dropdown">
            <img src="/profile-icon.png" alt="Profile" className="profile-img" />
            <ul className="dropdown-menu">
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/history">History</a>
              </li>
              <li>
                <a href="/mylistings">Postings</a>
              </li>
              <li>
                <a href="/">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Bookmark Section */}
      <div className="bookmark-section">
        <button onClick={handleSave} className="btn-listing">
          {isSaved ? 'Saved ✅' : 'Save'}
        </button>
      </div>

      {/* Header */}
      <div className="container-service">
        <div className="listing-header-service">
          <h1 className="listing-title-service">
            {service.title} <span className="location"> 📍 {service.location}</span>
          </h1>
        </div>

        {/* Images */}
        <div className="gallery-service">
          <div
            className="gallery-item-service"
            style={{ backgroundImage: `url(${service.image})` }}
          ></div>
        </div>

        {/* Description */}
        <div className="description-service">
          <p>{service.longDescription}</p>
        </div>

        {/* Price */}
        <div className="price-section">
          <div className="price">{service.price}</div>
        </div>

        {/* Seller Information */}
        <div className="seller-section">
          <h2 className="seller-header">Seller Information</h2>
          <div className="seller-info-service">
            <img src={sellerProfileImage} alt="Seller" className="seller-profile-service" />
            <div className="seller-details">
              <h2>{service.user || 'Seller'}</h2>
              <p>Junior at Columbia College</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;