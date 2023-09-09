import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Otp from "../pages/Otp";
import CarProduct from "../components/UI/CarProduct";
import Checkout from "../pages/Checkout";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/user/otp' element={<Otp />} />
        <Route path="/cartproduct" element={<CarProduct />} />
      </Routes>
    </Router>
  );
};

export default Routers;
