const express = require('express');
const cors = require('cors');  // Import the cors package
const app = express();
const restaurantRoutes = require('./routes/restaurantRoutes');

// Enable CORS for all routes
const allowedOrigins =  [
  'http://localhost:3000',  // Allow local development
  'https://mahendar-foods.netlify.app',  // Allow deployed frontend
  'https://zomato-restaurant-listing-searching-three.vercel.app/'
] ;

    app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow cookies if needed
    }));
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Use the restaurant routes for any request to /api/restaurants
app.use('/api/restaurants', restaurantRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// server.js or app.js
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  };
  
  app.use(cors(corsOptions));
  