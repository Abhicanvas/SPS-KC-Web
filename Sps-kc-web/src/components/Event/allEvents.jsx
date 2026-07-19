import React, { useEffect, useMemo, useState } from "react";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Home/home.css";
import "./event.css";

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const EVENTS_QUERY = `*[_type == "event" && defined(image.asset)]|order(date desc){
  _id,
  image,
  date
}`;

const heroSocialLinks = [
  { href: "https://www.facebook.com", label: "Facebook", icon: "f" },
  { href: "https://x.com", label: "X", icon: "x" },
  { href: "https://www.instagram.com", label: "Instagram", icon: "ig" },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: "in" },
];

function EventCard({ event, index }) {
  const imageUrl = event.image && event.image.asset ? urlFor(event.image).url() : null;

  return (
    <article className="event-slide">
      <div className="event-slide__frame">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Event ${index + 1}`}
            className="event-slide__image"
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
}

function EventCarousel({ title, subtitle, events }) {
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: events.length > 1,
      speed: 850,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      variableWidth: false,
      arrows: false,
      autoplay: events.length > 1,
      autoplaySpeed: 3200,
      pauseOnHover: true,
      adaptiveHeight: false,
      cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            centerPadding: "0px",
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 1,
            centerPadding: "18%",
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerPadding: "0px",
          },
        },
      ],
    }),
    [events.length]
  );

  if (!events.length) {
    return (
      <section className="events-block">
        <div className="events-block__heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="events-empty">No events available right now.</div>
      </section>
    );
  }

  return (
    <section className="events-block">
      <div className="events-block__heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="events-carousel">
        <Slider {...settings}>
          {events.map((event, index) => (
            <EventCard key={event._id} event={event} index={index} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(EVENTS_QUERY);
        setEvents(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  const today = new Date();
  const upcomingEvents = events.filter((event) => {
    if (!event.date) return true;
    return new Date(event.date) >= today;
  });
  const pastEvents = events.filter((event) => event.date && new Date(event.date) < today);

  return (
    <main className="events-page">
      <section id="home" className="hero-section events-hero">
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
              <strong>EVENTS</strong>
              <span className="events-hero__subtitle">IEEE SPS KERALA CHAPTER</span>
            </h1>
            <p>
              Explore upcoming sessions, workshops, and past chapter events.
            </p>
          </div>

          <div className="hero-side-panel">
            <div className="hero-social-rail">
              {heroSocialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-accent" />
      </section>

      <section className="events-content">
        <div className="events-shell">
          <div className="events-page__heading">
            <h1>EVENTS</h1>
          </div>

          <EventCarousel
            title="Upcoming Events"
            subtitle="New programs and announcements appear here first."
            events={upcomingEvents}
          />

          <EventCarousel
            title="Past Events"
            subtitle="A rotating archive of chapter activities and posters."
            events={pastEvents.length ? pastEvents : events}
          />
        </div>
      </section>
    </main>
  );
}
