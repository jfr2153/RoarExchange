import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles.css';
import profileLogo from '../profilelogo2.png'; // Imported image for consistency


// Import profile images

// Seller information hardcoded data
const sellers = {
  janedoe: {
    name: 'Jane Doe',
    profileImage: '/profile-icon.png', // Use absolute path for public folder
    about: `Hi! I'm Jane Doe, a sophomore at Columbia College and a nail art enthusiast. 
    I specialize in creating unique, hand-painted designs that let your personality shine—whether 
    you're into simple, classy looks or bold, statement nails. I love turning creative ideas 
    into beautiful, wearable art, and I'm always open to custom requests. Check out my designs, 
    and feel free to contact me if you'd like something personalized. Can't wait to make your nails look amazing! 💅✨`,
    email: 'janedoe123@columbia.edu',
    phone: '+1 123-456-7890',
  },
  madeline32: {
    name: 'Madeline Cortes',
    profileImage: require('../profilelogo2.png'), // Local src import
    about: `Hi! I'm Madeline Cortes, a junior at Columbia College. I’m your go-to baker for 
    homemade pies that bring joy and flavor to your day. My pies are baked with love and fresh 
    ingredients—perfect for students, staff, or anyone craving a little sweetness on campus! 🥧💙`,
    email: 'madelinecortes@columbia.edu',
    phone: '+1 987-654-3210',
  },
  notchefmike: {
    name: 'Mike Johnson',
    profileImage: require('../profilelogo3.png'), // Local src import
    about: "Welcome to Mike's Barbershop!",
    email: 'mikejohnson@columbia.edu',
    phone: '+1 555-123-4567',
  },
  thatguy92: {
    name: 'Rizz Master',
    profileImage: require('../profilelogo4.png'), // Local src import
    about: 'Learn Rizzology with me!',
    email: 'rizzmaster@columbia.edu',
    phone: '+1 555-987-6543',
  },
};

function SellerInfoPage() {
  const { username } = useParams(); // Extract username from the URL
  const seller = sellers[username];

  if (!seller) {
    return <div className="container">Seller information not found!</div>;
  }

  return (
    <div className="container-pro">
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-item profile">
          <div className="dropdown">
            <img src="/profile-icon.png" alt="Profile" className="profile-img" />
          </div>
        </div>
      </nav>

      {/* Seller Profile */}
      <header className="profile-header">
        <h1>{seller.name}</h1>
        <div className="profile-image">
          <img
            src={seller.profileImage}
            alt={seller.name}
            className="seller-profile-service"
            />

        </div>
      </header>

      {/* About Me */}
      <section className="section">
        <h2>About Me</h2>
        <p>{seller.about}</p>
      </section>

      {/* Contact Info */}
      <section className="section">
        <h2>How to Contact</h2>
        <div className="contact-info">
          <div className="contact-item">
            <strong>Email:</strong> {seller.email}
          </div>
          <div className="contact-item">
            <strong>Phone:</strong> {seller.phone}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SellerInfoPage;