import { Check, Quote } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { SITE_CONFIG } from "../../config/siteConfig";
import "./home.css";

const stats = [
  { value: "10+", label: "YEARS" },
  { value: "1156", label: "MEMBERS" },
  { value: "30+", label: "STUDENT CHAPTERS" },
  { value: "100+", label: "EVENTS" },
];

const checkpoints = [
  "Active since 2015 with 100+ student members across various chapters",
  "Recognized for organizing impactful events like the Student Development Program and TechTalk series",
  "Strong presence in IEEE Kerala Section",
  "Collaborated with organizations such as IEEE Computer Society, IEEE PES, and WIE",
  "Focus on technical growth, community service, and professional networking",
];

const activities = [
  {
    title: "Student Activities",
    text: "From hackathons and treasure hunts to hands-on technical workshops, student activities offer direct exposure to signal processing tools and applications, while event leadership and chapter roles build practical skills that extend well beyond the classroom.",
  },
  {
    title: "Membership Activities",
    text: "From hackathons and treasure hunts to hands-on technical workshops, student activities offer direct exposure to signal processing tools and applications, while event leadership and chapter roles build practical skills that extend well beyond the classroom",
  },
];

const testimonials = [
  {
    author: "Ananya P.",
    role: "Student Member",
    text: "A chapter that consistently turns ideas into practical, visible impact for the community.",
  },
  {
    author: "Rohit K.",
    role: "Faculty Advisor",
    text: "The energy around events, mentorship, and technical learning is always constructive and focused.",
  },
  {
    author: "Mid Card",
    role: "Featured Voice",
    text: "IEEE SPS Kerala Chapter creates a space where students and professionals can grow together.",
    featured: true,
  },
  {
    author: "Meera S.",
    role: "Volunteer",
    text: "The team balances institutional quality with a genuinely welcoming chapter culture.",
  },
  {
    author: "Arjun V.",
    role: "Alumnus",
    text: "The chapter keeps the signal processing community connected across campuses and industry.",
  },
];

const galleryImages = [
  "/img/events/Rectangle 18.png",
  "/img/events/gal1.webp",
  "/img/events/gal5.webp",
  "/img/events/gal3.webp",
  "/img/events/gal4.webp",
  "/img/events/gal2.webp",
];

const visionPoints = [
  "Leadership development — hands-on roles in student and professional activities that build real decision-making experience, not just titles.",
  "Structured mentorship — pairing emerging volunteers and chapter leaders with experienced members for guided, sustained growth",
  "Cross-chapter collaboration — stronger ties across Kerala's IEEE SPS network and beyond, turning isolated efforts into shared momentum.",
  "Industry partnerships — connecting classroom learning to real career pathways through internships, talks, and collaborative projects.",
  "Research and innovation — technical sessions and research initiatives that keep the chapter at the edge of signal processing advances.",
  "Community and sustainability — deeper outreach, DEI commitment, alumni engagement, and long-term chapter health.",
];

const socialLinks = [
  { href: SITE_CONFIG.SOCIAL_LINKS.FACEBOOK, icon: faFacebookF, label: "Facebook" },
  { href: "https://x.com/ieeespskerala", icon: faXTwitter, label: "X" },
  { href: SITE_CONFIG.SOCIAL_LINKS.INSTAGRAM, icon: faInstagram, label: "Instagram" },
  { href: SITE_CONFIG.SOCIAL_LINKS.LINKEDIN, icon: faLinkedinIn, label: "LinkedIn" },
  { href: "https://www.youtube.com", icon: faYoutube, label: "YouTube" },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <section id="home" className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />
        <img
          src="/img/slt26.jpeg"
          alt="IEEE SPS Kerala Chapter group photo"
          className="hero-photo-overlay"
        />
        <div className="home-shell hero-grid">
          <div className="hero-copy">
            <div className="hero-lockup">
              <img src="/img/logo/ieee png.png" alt="IEEE logo" className="hero-lockup-mark" />
              <div>
                <span>IEEE Kerala Section</span>
              </div>
            </div>
            <h1>
              <strong>IEEE</strong> SPS KERALA CHAPTER
            </h1>
            <p>
              Clean, professional, and community-first signal processing leadership for Kerala.
            </p>
            <div className="hero-actions">
              <a href="#about" className="button button-primary">
                Discover More
              </a>
              <a href="#gallery" className="button button-secondary">
                View Gallery
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

      <section className="intro-section">
        <div className="home-shell intro-shell">
          <span className="decor decor-top">❝</span>
          <p>
            Students, researchers, and professionals come together here — driven by practical learning, real collaboration, and a shared focus on advancing technically.
          </p>
          <span className="decor decor-bottom">❞</span>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="home-shell section-grid about-grid">
          <div className="section-heading-block">
            <p className="eyebrow">ABOUT</p>
            <img
              src="img/logo/sps.png"
              alt="IEEE SPS Kerala Chapter"
              className="about-logo"
            />
          </div>
          <div className="section-content-block">
            <p>
              The IEEE Signal Processing Society (SPS) is the world&apos;s premier association dedicated to advancing
              the field of signal processing. With a global community of 25,000 members.
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

      <section className="stats-section">
        <div className="home-shell stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
        <div className="ticker-bar" aria-label="chapter tagline ticker">
          <div className="ticker-track">
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index}>
                COLLABORATE <span className="ticker-dot">•</span> ENGAGE <span className="ticker-dot">•</span>
                EMPOWER <span className="ticker-dot">•</span> IEEE SPS <span className="ticker-dot">•</span>
                INNOVATE
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="activities" className="activities-section">
        <div className="home-shell">
          <div className="section-title-center">
            <p className="eyebrow">OUR ACTIVITIES</p>
            <h2>PROGRAMS THAT BUILD SKILL AND COMMUNITY</h2>
          </div>

          <div className="activity-feature">
            <div className="activity-copy">
              <p className="eyebrow underlined">Professional Activities</p>
              <p>
                Workshops, technical talks, and collaborative sessions bring together students, academics, and
                professionals around the latest signal processing themes.
              </p>
            </div>
            <img src="/img/slt26.jpeg" alt="Seminar audience" />
          </div>

          <div className="activity-grid-two">
            {activities.map((item) => (
              <article key={item.title} className="activity-card">
                <p className="eyebrow underlined">{item.title}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="home-shell">
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.author} className={`testimonial-card${item.featured ? " featured" : ""}`}>
                <Quote size={42} className="testimonial-quote" />
                <p>{item.text}</p>
                <div>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="home-shell">
          <div className="section-title-center">
            <h2>Gallery</h2>
            <p>A curated look back at workshops, hackathons, and flagship events — capturing the people, ideas, and moments that define the chapter year after year.</p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <img key={image} src={image} alt={`Gallery image ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="vision-section">
        <div className="home-shell section-grid vision-grid">
          <img src="/img/events/gal2.webp" />
          <div className="vision-copy">
            <div className="section-title-left">
              <h2>Our Vision</h2>
              <p>Shaping a stronger, more connected IEEE SPS community — one built on leadership, mentorship, and collaboration that carries into 2026 and beyond.</p>
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