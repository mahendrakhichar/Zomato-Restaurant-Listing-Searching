import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getRestaurantList, uploadCuisineImage } from '../api/restaurantService';
import { Link } from 'react-router-dom';
import './RestaurantList.css';


const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [city, setCity] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [radius, setRadius] = useState(10);
    const [name, setName] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [recognizedCuisine, setRecognizedCuisine] = useState('');

    const limit = 20;

    const fetchRestaurants = useCallback(async (reset = false, cuisine = '') => {
        try {
            const response = await getRestaurantList(page, limit, city, lat, lon, radius, cuisine || name);
            const newRestaurants = response.restaurants;
    
            const uniqueRestaurants = newRestaurants.filter(newRestaurant =>
                !restaurants.some(existingRestaurant => existingRestaurant.id === newRestaurant.id)
            );
    
            if (reset) {
                setRestaurants(uniqueRestaurants);
            } else {
                setRestaurants(prevRestaurants => [...prevRestaurants, ...uniqueRestaurants]);
            }
    
            if (page >= response.totalPages || uniqueRestaurants.length === 0) {
                setHasMore(false);
            } else {
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }, [page, limit, city, lat, lon, radius, name, restaurants]);  // Dependencies added
    
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setHasMore(true);
        fetchRestaurants(true);
    };
    
    const handleImageUpload = async (e) => {
        e.preventDefault();
    
        if (!selectedImage) {
            console.error('No image selected.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedImage);
    
        try {
            const response = await uploadCuisineImage(formData);
    
            if (!response || !response.cuisine) {
                throw new Error('Unexpected response format from the server.');
            }
    
            setRecognizedCuisine(response.cuisine);
            setPage(1);
            setHasMore(true);
            fetchRestaurants(true, response.cuisine);
        } catch (error) {
            console.error('Error uploading image or recognizing cuisine:', error.message || error);
        }
    };
    
    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);  // Now includes fetchRestaurants as a dependency

    return (
        <div>
            <div className="s-form">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search by city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={lon}
                        onChange={(e) => setLon(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="number"
                        placeholder="Radius (km)"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

            </div>
                {/* Image Upload Form */}
                <form onSubmit={handleImageUpload} className="image-upload-form">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        className="image-input"
                    />
                    <button type="submit" className="upload-button">Upload Image</button>
                </form>
            {recognizedCuisine && <h3>Recognized Cuisine: {recognizedCuisine}</h3>}


            <InfiniteScroll
                dataLength={restaurants.length}
                next={() => fetchRestaurants()}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more restaurants to show</p>}
            >
                <div className="restaurant-grid">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="restaurant-card">
                            <img
                                src={restaurant.featured_image || 'default-image.jpg'}
                                alt={restaurant.name}
                                className="restaurant-image"
                            />
                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.cuisines}</p>
                            <p>{restaurant.location}</p>
                            <Link to={`/restaurants/${restaurant.id}`} className="view-details-link">View Details</Link>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default RestaurantList;
