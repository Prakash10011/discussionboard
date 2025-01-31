import React, { useState } from 'react';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

  const handleCopyrightClick = () => {
    alert('Copyright © 2025 Your Name. All Rights Reserved.');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Your Name</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={isNavOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#hero">Hero Section</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#three-columns">Three-Column Section</a>
          </li>
          <li className="nav-item">
            <button className="btn btn-link" onClick={handleCopyrightClick}>Copyright</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
