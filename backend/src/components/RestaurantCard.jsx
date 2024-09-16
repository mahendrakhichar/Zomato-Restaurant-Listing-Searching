import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.cuisine}</p>
      <Link to={`/restaurant/${restaurant.id}`}>View Details</Link>
    </div>
  );
};

export default RestaurantCard;
