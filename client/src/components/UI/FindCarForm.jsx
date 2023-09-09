// FindCarForm.js

import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import CarItem from "./CarItem";

const FindCarForm = () => {
  const [formData, setFormData] = useState({
    brand: "", // Add a brand field
    modal: "",
    fuelType: "petrol",
  });

  const [filteredCars, setFilteredCars] = useState([]);
  const [filterBy, setFilterBy] = useState(""); // State to store filter criteria

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
      const encodedBrand = encodeURIComponent(formData.brand);
      const encodedModal = encodeURIComponent(formData.modal);

      // Modify the URL to include the search criteria
      const response = await axios.get(
        `http://localhost:4000/api/cars/find?brand=${encodedBrand}&modal=${encodedModal}&filterBy=${filterBy}`
      );

      if (response.data) {
        setFilteredCars(response.data);
      } else {
        setFilteredCars([]);
      }
    } catch (error) {
      console.error(error.response);
      setFilteredCars([]);
    }
  };
  return (
    <div>
      <Form className="form">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter Car Brand"
            />
          </FormGroup>
          <FormGroup className="form__group">
            <input
              type="text"
              name="modal"
              value={formData.modal}
              onChange={handleChange}
              placeholder="Enter Car Modal"
              required
            />
          </FormGroup>

          <FormGroup className="select__group">
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="petrol">Petrol</option>
              <option value="ev">EV</option>
            </select>
          </FormGroup>

          <FormGroup className="form__group">
            <button
              type="button"
              className="btn find__car-btn"
              onClick={handleSearch}
            >
              Find Car
            </button>
          </FormGroup>
        </div>
      </Form>
      <div>
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <CarItem key={index} car={car} />
          ))
        ) : (
          <p>No matching cars found</p>
        )}
      </div>
    </div>
  );
};

export default FindCarForm;
