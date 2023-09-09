import React, { useEffect, useState } from "react";
import axios from "axios";
import CarItem from "./CarItem"; // Assuming you have a CarItem component
import "./CartItem.css";
const CarProduct = () => {
    const [cars, setCars] = useState([]);

    // Fetch all products from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/cars/all"); // Use the new backend route
                setCars(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="car-list-container">
            {cars.map((car) => (
                <CarItem key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarProduct;
