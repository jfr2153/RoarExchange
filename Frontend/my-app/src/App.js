import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import ListingPage from './pages/listingpage';
import ProfilePage from './pages/profilepage';
import ListingForm from './pages/listingform';
import HistoryPage from './pages/historypage'; 
import MyListingsPage from './pages/mylistingspage';
import SellerInfoPage from './pages/sellerinfopage';
import RatingsPage from './pages/ratingspage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/listingform" element={<ListingForm />} />
        <Route path="/history" element={<HistoryPage />} /> 
        <Route path="/mylistings" element={<MyListingsPage />} />
        <Route path="/seller/:username" element={<SellerInfoPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;