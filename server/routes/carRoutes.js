// server/routes/carRoutes.js

const express = require('express');
const router = express.Router();
const Car = require('../models/car'); // Import the Car model
const Contact = require("../models/cantact");
// Route to add a new product
router.post('/add', async (req, res) => {
    try {
        const newProduct = req.body; // Assuming the request body contains the new product data

        // Create a new product document using the Mongoose model
        const createdProduct = await Car.create(newProduct);

        // Return the newly created product document
        res.json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// server/routes/carRoutes.js



// Route to fetch all products
router.get('/all', async (req, res) => {
    try {
        const allProducts = await Car.find(); // Retrieve all products from the database
        res.json(allProducts);
        //console.log(allProducts)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Corrected backend route
// Update the backend route to handle filterBy
// routes/cars.js

// ...

// GET route to find cars by brand, modal, and filter criteria
router.get("/find", async (req, res) => {
    try {
        const brand = req.query.brand || ""; // Get the brand from query parameters
        const modal = req.query.modal || ""; // Get the modal from query parameters
        const filterBy = req.query.filterBy || ""; // Get the filter criteria from query parameters

        // Find cars based on brand and modal
        const cars = await Car.find({
            brand: { $regex: new RegExp(brand, "i") }, // Case-insensitive search for brand
            modal: { $regex: new RegExp(modal, "i") }, // Case-insensitive search for modal
            // Add more filters based on your requirements
        });

        // Filter cars based on the filter criteria
        const filteredCars = cars.filter((car) =>
            filterBy ? car.type.toLowerCase() === filterBy.toLowerCase() : true
        );

        res.json(filteredCars);
        console.log(filteredCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// ...
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the message' });
    }
});

module.exports = router;
