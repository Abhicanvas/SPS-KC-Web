import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const execomItems = [
  { label: "Execom 2026", to: "/team" },
  { label: "Execom 2025", to: "/execom-25" },
  { label: "Execom 2024", to: "/execom-24" },
  { label: "Execom 2023", to: "/execom-23" },
  { label: "Execom 2022", to: "/execom-22" },
  { label: "Execom 2021", to: "/execom-21" },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close everything on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* ── Execom Dropdown ── */}
          <li className={`nav-dropdown${dropdownOpen ? " nav-dropdown--open" : ""}`} ref={dropdownRef}>
            <button
              type="button"
              className="nav-dropdown__trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Execom
              <ChevronDown size={16} className="nav-dropdown__chevron" />
            </button>
            <ul className="nav-dropdown__menu">
              {execomItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="nav-dropdown__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/awards">Awards</Link>
          </li>
          <li>
            <Link to="/achievements">Achievements</Link>
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
