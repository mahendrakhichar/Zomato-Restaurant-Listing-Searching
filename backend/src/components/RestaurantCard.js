import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css'; // Create and use a CSS file for styling

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <div className="card-content">
                <h3>{restaurant.name}</h3>
                <p>Cuisines: {restaurant.cuisines}</p>
                <p>Location: {restaurant.location}</p>
                <Link to={`/restaurant/${restaurant.id}`} className="view-details-link">View Details</Link>
            </div>
        </div>
    );
};

export default RestaurantCard;
