import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "../../config/siteConfig";

const Footer = () => {
  const importantLinks = [
    { label: "Committee activities", href: "/#activities" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Student Activities", href: "/sbc" },
    { label: "Officers", href: "/team" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Events", href: "/events" },
    { label: "Organizational Story", href: "/#vision" },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={SITE_CONFIG.LOGO_PATH} alt="IEEE SPS Kerala Chapter" />
            <p>
              IEEE Signal Processing Society Kerala Chapter advances technical excellence, collaboration, and
              leadership across the state.
            </p>
            <div className="footer-socials">
              <a href={SITE_CONFIG.SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://x.com/ieeespskerala" target="_blank" rel="noreferrer" aria-label="X">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href={SITE_CONFIG.SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href={SITE_CONFIG.SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          <div className="footer-columns">
            <div>
              <h3>Important Links</h3>
              <ul>
                {importantLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Company</h3>
              <ul>
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <ul className="contact-list">
                <li>
                  <Mail size={16} />
                  <a href={`mailto:${SITE_CONFIG.CONTACT.EMAIL}`}>{SITE_CONFIG.CONTACT.EMAIL}</a>
                </li>
                <li>
                  <Phone size={16} />
                  <a href={`tel:${SITE_CONFIG.CONTACT.PHONE}`}>{SITE_CONFIG.CONTACT.PHONE}</a>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>
                    {SITE_CONFIG.CONTACT.ADDRESS.STREET.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    {SITE_CONFIG.CONTACT.ADDRESS.CITY}, {SITE_CONFIG.CONTACT.ADDRESS.STATE} {SITE_CONFIG.CONTACT.ADDRESS.POSTAL_CODE}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 Developed by IEEE Kerala Section — IEEE SPS Kerala Section</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
