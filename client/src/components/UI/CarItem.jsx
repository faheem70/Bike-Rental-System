import React from "react";
import "./CartItem.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const CarItem = ({ car }) => {
  // Check if 'car' is defined before accessing its properties
  if (!car) {
    return <div>No car data available</div>;
  }

  return (
    <div className="car-item">
      <img src={car.imgUrl} alt={car.bikeName} />
      <h2>{car.bikeName}</h2>
      <div className="car-details">
        <p>Brand: {car.brand}</p>
        <p>Model: {car.model}</p>
        <p>Price: ₹{car.price}</p>
        <p>Speed: {car.speed}</p>
        <p>GPS: {car.gps}</p>
        <p>FuelType: {car.fueltype}</p>
      </div>
      <Link to="/checkout">
        <button className="rent-button">Rent</button>
      </Link>
    </div>
  );
};

export default CarItem;
