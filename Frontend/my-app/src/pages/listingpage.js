import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles.css';

// Import hardcoded images
import pieImage from '../listingimages/pie.jpg';
import barberImage from '../listingimages/barber.jpg';
import appleImage from '../listingimages/apple.jpg';
import nailartImage from '../listingimages/nailart1.jpg';
// Import profile images
import profileLogo2 from '../profilelogo2.png'; // For @madeline32
import profileLogo3 from '../profilelogo3.png'; // For @notchefmike
import profileLogo4 from '../profilelogo4.png'; // For @thatguy92

const profileImages = {
  '@janedoe': '/profile-icon.png', // Public folder path
  '@madeline32': profileLogo2,     // Imported from src
  '@notchefmike': profileLogo3,    // Imported from src
  '@thatguy92': profileLogo4,      // Imported from src
};



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
      longDescription: `Welcome to my bakery (kind of)! Your one-stop shop for delicious, homemade pies right here at Columbia University! Whether you're pulling an all-nighter or just craving something sweet between classes, we've got you covered with our mouth-watering pie selection. Freshly baked and perfect for sharing (or not), these pies are made with love just for you, Columbia students! 💙

      Order at least 1 day in advance (I am a college student too, so we totally get it if you're in a rush!). For larger orders, give me a heads up a week before! ⏰ I don't do delivery. All pick-ups will be at Wein Hall. You won’t regret it! 😋
      
      Current Flavors: Apple, Chocolate Cream, Pumpkin, Blueberry, Pecan, Key Lime, and S'mores!
      
      Payment Methods: Cash, Zelle, PayPal, and Venmo.`,
      image: pieImage, // Hardcoded image
      rating: 4.8,       // Add this for hardcoded rating
      totalRatings: 200,
      ratingSplits: { '5': 120, '4': 60, '3': 20, '2': 0, '1': 0 },
    },
    {
      id: 'barber',
      title: "Mike's Barbershop 💈",
      user: '@notchefmike',
      description: "I'm not chef mike but I do cook in the salon (my room). Book fast. Slots are filling up quick.",
      price: 'Contact for pricing',
      location: 'Mike’s Room',
      longDescription: `Welcome to Mike's Barbershop 💈—where style meets personality! I’m not Chef Mike, but I do whip up fresh cuts and clean fades right here in my salon (aka my room). Whether you need a sharp lineup or a full transformation, I’ve got you covered with precision and care. Slots are filling up fast, so don’t wait to book your appointment—your next great look is just a trim away. Columbia students, get ready to look fresh! ✂️🔥

      💸 Payment Methods: Cash, Venmo, Zelle
      📅 Book early to secure your spot!`,
      image: barberImage,
      rating: 4.5,
      totalRatings: 150,
      ratingSplits: { '5': 90, '4': 45, '3': 15, '2': 0, '1': 0 },

    },
    {
      id: 'rizzlessons',
      title: 'Rizz Lessons 101 😏',
      user: '@thatguy92',
      description: 'Certified in Rizzology. I will teach you how to win someone over in 30 seconds or less.',
      price: '$20 per lesson',
      location: 'Campus Center',
      longDescription: `Welcome to Rizz Lessons 101 😏—your crash course in the art of charm! Certified in Rizzology, I’ll teach you how to captivate anyone’s attention and win them over in 30 seconds or less. Whether you’re looking to level up your confidence, ace that first impression, or unlock the secret to effortless charisma, I’ve got you covered. Trust the process and invest in your love life—you’ll thank me later. 💘✨

      💸 Payment Methods: Cash, Venmo, Zelle
      📅 Book your session now and start rizzing with confidence!`,
      image: appleImage,
      rating: 4.0,
      totalRatings: 350,
      ratingSplits: { '5': 175, '4': 105, '3': 70, '2': 0, '1': 0 },
    },
    {
      id: 'nailart',
      title: 'Glam Nails by Jane',
      user: '@janedoe',
      description: 'Elevate your style with custom nail art!',
      price: '$30 per session',
      location: 'East Dorm',
      longDescription: `Elevate your style with custom nail art and professional care! Offering hand-painted designs, gel manicures, and natural nail services in a cozy, self-run studio. Book your appointment for a personalized and relaxing experience that makes your nails shine as brightly as you do.

      Prices vary depending on design. I require a $10 deposit before we begin! I accept cash, Venmo, Paypal, and Zelle. Book an appointment by contacting me personally.`,
      image: nailartImage,
      rating: 4.7,
      totalRatings: 120,
      ratingSplits: { '5': 84, '4': 24, '3': 12, '2': 0, '1': 0 },
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

        {/* Price & Rating */}
        <div className="price-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="price">{service.price}</div>
          <div className="rating-service" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
            <Link
              to="/ratings"
              state={{
                rating: service.rating || 0,
                totalRatings: service.totalRatings || 0,
                splits: service.ratingSplits || { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
              }}
              className="rating-link"
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
            >
              <span className="rating-number-service" style={{ fontWeight: 'bold', marginRight: '5px' }}>
                {service.rating ? service.rating.toFixed(1) : '0.0'}
              </span>
              <span className="star" style={{ color: '#f5a623', marginRight: '5px' }}>★</span>
              <span className="rating-count-service" style={{ color: '#555' }}>
                ({service.totalRatings || 0} Ratings)
              </span>
            </Link>
          </div>
        </div>


        {/* Long Description */}
        <div className="description-service">
          {service.longDescription.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Seller Information */}
        <div className="seller-section">
          <h2 className="seller-header">Seller Information</h2>
          <Link to={`/seller/${service.user ? service.user.replace('@', '') : 'janedoe'}`}>
            <div className="seller-info-service">
              <img
                src={profileImages[service.user || '@janedoe'] || '/profile-icon.png'}
                alt={service.user || '@janedoe'}
                className="seller-profile-service"
              />
              <div className="seller-details">
                <h3>{service.user || '@janedoe'}</h3>
                <p>Click for more details!</p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default ListingPage;