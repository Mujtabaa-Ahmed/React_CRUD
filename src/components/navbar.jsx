import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create this CSS file next

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-logo">
          MyCRUD
        </Link>

        {/* Mobile menu button */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        {/* Navigation links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-links" onClick={toggleMenu}>
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/view" className="nav-links" onClick={toggleMenu}>
              View All
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={toggleMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;