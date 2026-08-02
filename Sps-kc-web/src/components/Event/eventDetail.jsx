import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft, Tag } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import { getFeaturedEventRecord } from "./eventRecords";
import "./event.css";

const { projectId, dataset } = client.config();
const builder =
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
    : imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
}

const EVENT_DETAIL_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  image,
  description,
  author,
  status,
  categories,
  tags
}`;

function formatDate(value) {
  if (!value) return "Date pending";

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetailPage() {
  const { slug } = useParams();
  const localRecord = getFeaturedEventRecord(slug);
  const [sanityEvent, setSanityEvent] = useState(null);
  const [loading, setLoading] = useState(!localRecord);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (localRecord) {
      setSanityEvent(null);
      setLoading(false);
      setError("");
      return () => {
        active = false;
      };
    }

    async function fetchEvent() {
      try {
        const data = await client.fetch(EVENT_DETAIL_QUERY, { slug });
        if (active) {
          setSanityEvent(data);
        }
      } catch (fetchError) {
        console.error("Sanity fetch error:", fetchError);
        if (active) {
          setError("Unable to load the event record right now.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchEvent();

    return () => {
      active = false;
    };
  }, [slug, localRecord]);

  const event = localRecord || sanityEvent;

  const eventImage = useMemo(() => {
    if (!event) return null;
    if (typeof event.image === "string") return event.image;
    if (event.image && event.image.asset) return urlFor(event.image);
    return null;
  }, [event]);

  if (loading) {
    return <div className="events-page__loading">Loading event record...</div>;
  }

  if (error || !event) {
    return (
      <main className="events-page event-detail-page">
        <div className="events-shell">
          <div className="awards-empty">{error || "Event record not found."}</div>
          <Link to="/events" className="event-detail__backlink">
            <ArrowLeft size={16} />
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  const title = event.title || "Event record";
  const isPending = Boolean(localRecord && localRecord.mode === "pending");
  const isFlagship = Boolean(localRecord && localRecord.mode === "flagship") || /signal/i.test(title);
  const status = isPending ? "PENDING" : isFlagship ? "FLAGSHIP" : "EVENT";
  const metaCategories = event.categories || event.tags || [];
  const detailText = localRecord ? event.history : event.description || "Details pending.";

  return (
    <main className="events-page event-detail-page">
      <section className="event-detail-shell">
        <Link to="/events" className="event-detail__backlink">
          <ArrowLeft size={16} />
          Back to events
        </Link>

        <header className="event-detail-hero">
          <p className="event-detail-eyebrow">Event record</p>
          <div className="event-detail__headrow">
            <span className={`signal-record__tag ${isFlagship ? "signal-record__tag--flagship" : "signal-record__tag--pending"}`}>
              {status}
            </span>
            <span className="event-detail__slug">{slug}</span>
          </div>
          <h1>{title}</h1>
          <p className="event-detail__summary">
            {isFlagship
              ? "Flagship chapter record with history, metadata, and poster art preserved as an openable archive page."
              : isPending
                ? "Placeholder record with poster-first presentation until final event details are supplied."
                : "Poster-first event record with title, metadata, and hover-friendly poster framing preserved as an openable archive page."}
          </p>
        </header>

        <div className="event-detail-grid">
          <aside className="event-detail-poster">
            {eventImage ? (
              <img src={eventImage} alt={title} className="event-detail-poster__image" />
            ) : (
              <div className="event-detail-poster__placeholder">POSTER PENDING</div>
            )}
          </aside>

          <section className="event-detail-panel">
            <div className="event-detail-specs">
              <div className="event-detail-spec">
                <Calendar size={16} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="event-detail-spec">
                <MapPin size={16} />
                <span>{event.venue || "Venue pending"}</span>
              </div>
            </div>

            <div className="event-detail-section">
              <h2>{isFlagship ? "History" : "Overview"}</h2>
              <p>{detailText}</p>
            </div>

            <div className="event-detail-section">
              <h2>Details</h2>
              <div className="event-detail-tags">
                {metaCategories.length > 0 ? (
                  metaCategories.map((item) => (
                    <span key={item} className="event-detail-tag">
                      <Tag size={12} />
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="event-detail-tag event-detail-tag--muted">No additional details yet</span>
                )}
              </div>
            </div>

            {isFlagship ? (
              <div className="event-detail-section">
                <h2>Highlights</h2>
                <ul className="event-detail-highlights">
                  {(event.highlights || []).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}