import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RestaurantListPage from './pages/RestaurantListPage'; // Import the restaurant list page
import RestaurantDetailPage from './pages/RestaurantDetailPage'; // Import the restaurant detail page

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define the route for the home page */}
        <Route path="/" element={<h2>Home Page</h2>} />

        {/* Define the route for the restaurant list page */}
        <Route path="/restaurants" element={<RestaurantListPage />} />

        {/* Define the route for restaurant details using a dynamic ID */}
        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
