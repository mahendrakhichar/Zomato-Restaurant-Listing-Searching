// src/api.js

const API_URL = 'http://localhost:30000';

export const getRestaurants = async () => {
  try {
    const response = await fetch('/api/restaurants'); // Make sure this path is correct
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};


export const getRestaurantById = async (id) => {
  try {
    const response = await fetch(`/api/restaurants/${id}`); // Ensure this URL is correct
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    throw error;
  }
};