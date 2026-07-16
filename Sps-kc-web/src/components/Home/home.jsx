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
  { value: "78", label: "YEARS" },
  { value: "1000+", label: "MEMBERS" },
  { value: "30+", label: "STUDENT MEMBERS" },
  { value: "200+", label: "EVENTS" },
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
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta, nibh sed iaculis faucibus, arcu nunc pretium est, eget molestie lorem nisi vitae lectus.",
  },
  {
    title: "Membership Activities",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta, nibh sed iaculis faucibus, arcu nunc pretium est, eget molestie lorem nisi vitae lectus.",
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
  "/img/events/WhatsApp-Image-2023-10-24-at-7.01.06-PM-qec7o4oryuf1bff4wba8p5haj5a93d1y40p5s4czfc.jpeg",
  "/img/events/WhatsApp-Image-2023-11-16-at-19.01.38_e5ec5b19-qfhyywbvwkxiiew2ay5dnywp9yrlkjt731t41fx9p4.jpg",
  "/img/events/WhatsApp-Image-2023-11-17-at-17.48.42_e4b128f8-qfhyyx9q3eysu0up5gk08go5vcmys8wxf6glipvviw.jpg",
  "/img/events/WhatsApp-Image-2024-07-11-at-4.32.13-PM-qr28cnt5n3ucsv5efg87vn7ezd954p98i9lyhcspy0.jpeg",
  "/img/events/WhatsApp-Image-2024-07-11-at-4.32.30-PM-qr28dlnch54oets8xuusdeo0d8mctszkmx3frbejq0.jpeg",
  "/img/events/WhatsApp-Image-2024-07-11-at-4.32.35-PM-1-qr28dvzkkbityjd89hbomu22wh7e6h4mcc9s1cz7tk.jpeg",
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

export default function HomePage() {
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
            The Signal Processing Society, founded as IEEE&apos;s first society in 1948, is the world&apos;s premier
            association for signal processing engineers and industry professionals. Engineers around the world look
            to the Society for information on the latest developments in the signal processing field.
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
            <img src="/img/events/IEEE-SPS-EXECOM-1-scaled.jpeg" alt="Seminar audience" />
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
            <p>Lorem ipsum is simple dummy text of the printing and typesetting industry.</p>
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