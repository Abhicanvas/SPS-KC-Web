import React, { useEffect, useMemo, useState } from "react";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./event.css";
import Footer from "../footer/footer";

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

const heroSocials = [
  { href: "https://twitter.com", label: "Twitter", svgPath: "M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0 0 22.46 6z" },
  { href: "https://facebook.com", label: "Facebook", svgPath: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" },
  { href: "https://instagram.com", label: "Instagram", svgPath: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
  { href: "https://linkedin.com", label: "LinkedIn", svgPath: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" }
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

function EventCarousel({ title, events }) {
  // When events.length <= 3 (same as slidesToShow), react-slick's centerMode
  // fails to apply the center offset on the track. Fall back to slidesToShow:1
  // with centerPadding so the centered layout matches the Past Events carousel.
  const fewSlides = events.length <= 3 && events.length > 1;

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: events.length > 1,
      speed: 850,
      slidesToShow: fewSlides ? 1 : 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: fewSlides ? "25%" : "0px",
      variableWidth: false,
      arrows: false,
      accessibility: true,
      autoplay: events.length > 1,
      autoplaySpeed: 3200,
      pauseOnHover: true,
      adaptiveHeight: false,
      lazyLoad: "progressive",
      cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: fewSlides ? 1 : 3,
            centerPadding: fewSlides ? "25%" : "0px",
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 1,
            centerPadding: "20%",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: "15%",
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerPadding: "30px",
          },
        },
      ],
    }),
    [events.length, fewSlides]
  );

  if (!events.length) {
    return (
      <section className="events-block">
        <div className="events-block__heading">
          <h2>{title}</h2>
        </div>
        <div className="events-empty">No events available right now.</div>
      </section>
    );
  }

  return (
    <section className="events-block">
      <div className="events-block__heading">
        <h2>{title}</h2>
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

  if (loading) {
    return (
      <div className="events-page__loading">
        <div className="events-page__spinner" />
        <p>Loading events...</p>
      </div>
    );
  }

  const today = new Date();
  const upcomingEvents = events.filter((event) => {
    if (!event.date) return true;
    return new Date(event.date) >= today;
  });
  const pastEvents = events.filter((event) => event.date && new Date(event.date) < today);

  return (
    <main className="events-page">
      {/* ── Visual Consistent Hero ── */}
      <section className="events-page__hero" aria-labelledby="events-hero-title">
        <div className="events-page__heroOverlay" />
        <div className="events-page__heroContent">
          <div className="events-page__heroBadge">
            <img
              src="/img/logo/sps kc png.png"
              alt="IEEE SPS Kerala Chapter"
              className="events-page__heroLogo"
            />
            <span className="events-page__heroBadgeText">
              IEEE
              <br />
              <strong>
                Kerala Section
                <br />
                Kochi
              </strong>
            </span>
          </div>
          <h1 id="events-hero-title">
            EVENTS
            <br />
            <span className="events-page__heroAccent">IEEE SPS Kerala Chapter</span>
          </h1>
        </div>
        <div className="events-page__heroSocials">
          {heroSocials.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d={item.svgPath} />
              </svg>
            </a>
          ))}
        </div>
      </section>

      <section className="events-content">
        <div className="events-shell">
          <EventCarousel
            title="Upcoming Events"
            events={upcomingEvents}
          />

          <EventCarousel
            title="Past Events"
            events={pastEvents.length ? pastEvents : events}
          />
        </div>
      </section>
    </main>
  );
}
