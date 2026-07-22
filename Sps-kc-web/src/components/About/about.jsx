import { Check } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { SITE_CONFIG } from "../../config/siteConfig";
import "../Home/home.css";

const checkpoints = [
  "Active since 2015 with 100+ student members across various chapters",
  "Recognized for organizing impactful events like the Student Development Program and TechTalk series",
  "Strong presence in IEEE Kerala Section",
  "Collaborated with organizations such as IEEE Computer Society, IEEE PES, and WIE",
  "Focus on technical growth, community service, and professional networking",
];

const visionPoints = [
  "Leadership development through hands-on student and professional roles",
  "Structured mentorship for emerging volunteers and chapter leaders",
  "Cross-chapter collaboration across Kerala and the wider IEEE network",
  "Industry partnerships that convert learning into career pathways",
  "Research initiatives and technical sessions that sustain innovation",
  "Community outreach, DEI, alumni engagement, and sustainability",
];

const socialLinks = [
  { href: SITE_CONFIG.SOCIAL_LINKS.FACEBOOK, icon: faFacebookF, label: "Facebook" },
  { href: "https://x.com/ieeespskerala", icon: faXTwitter, label: "X" },
  { href: SITE_CONFIG.SOCIAL_LINKS.INSTAGRAM, icon: faInstagram, label: "Instagram" },
  { href: SITE_CONFIG.SOCIAL_LINKS.LINKEDIN, icon: faLinkedinIn, label: "LinkedIn" },
  { href: "https://www.youtube.com", icon: faYoutube, label: "YouTube" },
];

export default function AboutPage() {
  return (
    <main className="home-page">
      <section id="home" className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />
        <img
          src="/img/IEEE-SPS-EXECOM.jpeg"
          alt="IEEE SPS Kerala Chapter group photo"
          className="hero-photo-overlay"
        />
        <div className="home-shell hero-grid">
          <div className="hero-copy">
            <div className="hero-lockup">
              <img src="/img/logo/ieee png.png" alt="IEEE logo" className="hero-lockup-mark" />
              <div>
                <span>IEEE Kerala Section Kochi</span>
              </div>
            </div>
            <h1>
              <strong>ABOUT</strong> IEEE SPS KERALA CHAPTER
            </h1>
            <p>
              A closer look at the chapter&apos;s mission, community, and long-term vision for signal processing in
              Kerala.
            </p>
            <div className="hero-actions">
              <a href="#about" className="button button-primary">
                Learn About Us
              </a>
              <a href="#vision" className="button button-secondary">
                Our Vision
              </a>
            </div>
          </div>

          <div className="hero-side-panel">
            <div className="hero-social-rail">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-accent" />
      </section>

      <section id="about" className="about-section">
        <div className="home-shell section-grid about-grid">
          <div className="section-heading-block">
            <p className="eyebrow">ABOUT</p>
            <img src="/img/logo/sps.png" alt="IEEE SPS Kerala Chapter" className="about-logo" />
          </div>
          <div className="section-content-block">
            <p>
              The IEEE Signal Processing Society (SPS) is the world&apos;s premier association dedicated to advancing
              the field of signal processing. With a global community of 25,000 members, it supports research,
              education, and professional exchange across industry and academia.
            </p>
            <ul className="check-list">
              {checkpoints.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="home-shell intro-shell">
          <span className="decor decor-top">❝</span>
          <p>
            The chapter brings students, researchers, and professionals together around practical learning,
            meaningful collaboration, and a steady focus on technical growth.
          </p>
          <span className="decor decor-bottom">❞</span>
        </div>
      </section>

      <section id="vision" className="vision-section">
        <div className="home-shell section-grid vision-grid">
          <img src="/img/events/WhatsApp-Image-2024-07-11-at-4.32.39-PM-qr28e79muby9tuwufm77gr7m13nsqudedw3lsoihqw.jpeg" alt="IEEE chapter event" />
          <div className="vision-copy">
            <div className="section-title-left">
              <h2>Our Vision</h2>
              <p>Building a stronger, more collaborative IEEE SPS community for 2026 and beyond.</p>
            </div>
            <p className="vision-kicker">VISION FOR 2026</p>
            <ul className="check-list">
              {visionPoints.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
