import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Bikes",
  },


  {
    path: "/contact",
    display: "Contact",
  },
];


const Header = () => {
  const menuRef = useRef(null);
  const location = useLocation();
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    // Handle logout logic here
    // You can remove the token from localStorage or your authentication state
    // Example using localStorage:
    localStorage.removeItem("userdbtoken");

    // Update the authentication status
    setIsLoggedIn(false);
  };

  // Check user authentication when the component mounts
  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem("userdbtoken");


    if (token) {
      // User is authenticated
      setIsLoggedIn(true);
    } else {
      // User is not authenticated
      setIsLoggedIn(false);
    }
    const params = new URLSearchParams(location.search);
    const firstNameFromQuery = params.get('fname');
    if (firstNameFromQuery) {
      setFirstName(firstNameFromQuery);
    }
  }, [location.search]);
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i>+9197*******9
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  // Display user name and logout button if logged in
                  <>
                    <span>Welcome, {firstName}</span>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  // Display login and register links if not logged in
                  <>
                    <Link to="/login" className="d-flex align-items-center gap-1">
                      <i className="ri-login-circle-line"></i> Login
                    </Link>
                      <Link to="/register" className="d-flex align-items-center gap-1">
                        <i className="ri-user-line"></i> Register
                      </Link>
                  </>
                )}
              </div>
            </Col>

          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-motorbike-fill "></i>
                    <span>
                      Rent Bike <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Uttar Pradesh,India</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Monday to Saturday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
