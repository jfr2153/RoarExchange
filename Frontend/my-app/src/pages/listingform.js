import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function ListingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    categories: [],
    shortDescription: '',
    longDescription: '',
    location: '',
    price: '',
    image: './listingimages/default.jpg', // Default image placeholder
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle category selection (up to 3 categories)
  const handleCategoryChange = (event) => {
    const options = Array.from(event.target.options).filter((option) => option.selected);
    if (options.length > 3) {
      alert('You can select up to 3 categories only.');
      event.target.options[event.target.selectedIndex].selected = false;
    } else {
      setFormData((prevData) => ({
        ...prevData,
        categories: options.map((option) => option.value),
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          image: e.target.result, // Save the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Generate a unique id for the new service
    const newId = formData.title
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Remove special characters
      + '-' + Date.now(); // Append a timestamp for uniqueness
  
    const newService = {
      ...formData,
      id: newId, // Add the generated id
    };
  
    // Retrieve existing services from LocalStorage or initialize an empty array
    const services = JSON.parse(localStorage.getItem('services')) || [];
  
    // Add the new service
    services.push(newService);
  
    // Save back to LocalStorage
    localStorage.setItem('services', JSON.stringify(services));
  
    // Redirect to homepage
    navigate('/');
  };
  

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
            <a href="/profile">
              <img src="profile-icon.png" alt="Profile" className="profile-img" />
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Q1: Type of Listing */}
          <div className="form-group">
            <label className="required">What are you listing today?</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value="product"
                  checked={formData.type === 'product'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />{' '}
                Product
              </label>
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value="service"
                  checked={formData.type === 'service'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />{' '}
                Service
              </label>
            </div>
          </div>

          {/* Q2: Upload Cover Image */}
          <div className="form-group">
            <label>Upload a cover image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Q3: Title of Listing */}
          <div className="form-group">
            <label className="required">Title of Listing:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a title for your listing"
            />
          </div>

          {/* Q4: Service Categories */}
          <div className="form-group">
            <label className="required">Service Categories (up to 3):</label>
            <select id="categories" multiple size="5" onChange={handleCategoryChange}>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Event Planning">Event Planning</option>
              <option value="Fashion">Fashion</option>
              <option value="Food">Food</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Sports">Sports</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Q5: Short Description */}
          <div className="form-group">
            <label className="required">Short Description (up to 200 characters):</label>
            <textarea
              name="shortDescription"
              rows="4"
              maxLength="200"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief description of your listing"
            ></textarea>
          </div>

          {/* Q6: Long Description */}
          <div className="form-group">
            <label className="required">Long Description:</label>
            <textarea
              name="longDescription"
              rows="4"
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Detailed description of your listing"
            ></textarea>
          </div>

          {/* Q7: Location */}
          <div className="form-group">
            <label className="required">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
            />
          </div>

          {/* Q8: Price */}
          <div className="form-group">
            <label className="required">Price(s):</label>
            <textarea
              name="price"
              rows="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ex: Small: $10, Large: $20"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" data-tooltip="Save">
              Save Draft
            </button>
            <button type="submit" className="btn btn-primary" data-tooltip="Submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListingForm;