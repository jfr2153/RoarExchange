import React from 'react';
import '../styles.css'; // Adjust the path to match your structure

function ProfilePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-item logo">
          <a href="/">
            <img src="logo.png" alt="Logo" className="logo-img" />
          </a>
        </div>
        <div className="nav-item profile">
          <div className="dropdown">
            <img src="profile-icon.png" alt="Profile" className="profile-img" id="profileIcon" />
            <ul className="dropdown-menu" id="dropdownMenu">
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

      <div className="container-pro">
        {/* Header */}
        <header className="profile-header">
          <h1>Jane Doe</h1>
          <div className="profile-image">
            <img src="profile-icon.png" alt="Jane Doe" />
          </div>
        </header>

        {/* About Me Section */}
        <section className="section">
          <h2>About Me</h2>
          <p>
            Hi! I'm Jane Doe, a sophomore at Columbia College and a nail art enthusiast. I specialize in creating
            unique, hand-painted designs that let your personality shine—whether you're into simple, classy looks or
            bold, statement nails. I love turning creative ideas into beautiful, wearable art, and I'm always open to
            custom requests. Check out my designs, and feel free to contact me if you'd like something personalized.
            Can't wait to make your nails look amazing! 💅✨
          </p>
        </section>

        {/* Contact Section */}
        <section className="section">
          <h2>How to Contact</h2>
          <div className="contact-info">
            <div className="contact-item">
              <strong>Email:</strong> janedoe123@columbia.edu
            </div>
            <div className="contact-item">
              <strong>Phone:</strong> +1 123-456-7890
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;