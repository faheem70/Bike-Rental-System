/*const Car = require('../models/car');

// Route to create a new product
exports.createProduct = async (req, res) => {
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
};

// Route to fetch all products
exports.getProducts = async (req, res) => {
    try {
        const allProducts = await Car.find(); // Retrieve all products from the database
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Route to search for cars based on brand, modal, and filter criteria
exports.searchProducts = async (req, res) => {
    try {
        const brand = req.query.brand || ""; // Get the brand from query parameters
        const modal = req.query.modal || ""; // Get the modal from query parameters
        const filterBy = req.query.filterBy || ""; // Get the filter criteria from query parameters

        // Find cars based on brand and modal with case-insensitive search
        const cars = await Car.find({
            brand: { $regex: new RegExp(brand, "i") }, // Case-insensitive search for brand
            modal: { $regex: new RegExp(modal, "i") }, // Case-insensitive search for modal
            // Add more filters based on your requirements
        });

        // Filter cars based on the filter criteria (case-insensitive)
        const filteredCars = cars.filter((car) =>
            filterBy ? car.type.toLowerCase() === filterBy.toLowerCase() : true
        );

        res.json(filteredCars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
*/
