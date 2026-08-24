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

const joinUsHref =
  "https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMSP001&refProd=MEMSP001";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isExecomRoute = location.pathname.startsWith("/execom") || location.pathname === "/team";

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
      <div className="navbar-accent-bar" aria-hidden="true" />
      <div className="navbar-shell">
        <Link to="/" className="logo" aria-label="IEEE SPS Kerala Chapter home">
          <img src="/img/logo/sps-kc-bl.png" alt="IEEE SPS Kerala Chapter" />
        </Link>

        <button className="menu-icon" id="menu-icon" type="button" onClick={() => setIsOpen((value) => !value)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <ul className={`nav-links${isOpen ? " open" : ""}`} id="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "nav-link nav-link--active" : "nav-link"}>
              Home
            </Link>
          </li>

          {/* ── Execom Dropdown ── */}
          <li
            className={`nav-dropdown${dropdownOpen ? " nav-dropdown--open" : ""}${isExecomRoute ? " nav-dropdown--active" : ""}`}
            ref={dropdownRef}
          >
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
            <Link to="/events" className={location.pathname === "/events" ? "nav-link nav-link--active" : "nav-link"}>
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/achievements"
              className={location.pathname.startsWith("/achievements") ? "nav-link nav-link--active" : "nav-link"}
            >
              Achievements
            </Link>
          </li>
          <li>
            <Link to="/awards" className={location.pathname === "/awards" ? "nav-link nav-link--active" : "nav-link"}>
              Awards
            </Link>
          </li>
          <li className="nav-cta-wrap">
            <a href={joinUsHref} className="nav-cta" target="_blank" rel="noreferrer">
              Join us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
