import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-shell">
        <a href="/" className="logo" aria-label="IEEE SPS Kerala Chapter home">
          <img src="/img/logo/sps kc png.png" alt="IEEE SPS Kerala Chapter" />
        </a>

        <button className="menu-icon" id="menu-icon" type="button" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <ul className={`nav-links${isOpen ? " open" : ""}`} id="nav-links">
          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <a href="/#activities">Development</a>
          </li>
          <li>
            <a href="/#vision">Alumni</a>
          </li>
          <li className="nav-cta-wrap">
            <a href="/#contact" className="nav-cta">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
