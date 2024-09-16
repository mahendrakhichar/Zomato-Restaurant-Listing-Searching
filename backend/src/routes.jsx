import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantListPage from './pages/RestaurantListPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantListPage />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
