import React, { useEffect, useState } from "react";
import { Award as AwardIcon, Sparkles, UserRound } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import "./awards.css";

// Icon mapping for lucide-react
const iconMap = {
  Award: AwardIcon,
  Sparkles,
  UserRound,
};

const chapterAffiliation = "IEEE SPS Kerala Chapter";

const { projectId, dataset } = client.config();
const builder =
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
    : imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function groupAwardsByYear(items) {
  return items.reduce((groups, item) => {
    const year = item.year ?? "Unknown";

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(item);
    return groups;
  }, {});
}

function Awards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "award" && defined(name)] | order(year desc) {
      _id,
      name,
      recipient,
      year,
      description,
      icon,
      image
    }`
      )
      .then((data) => {
        setAwards(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setError("Unable to load awards right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="awards-page">
      <div className="awards-shell">
        <header className="awards-hero">
          <div className="awards-hero-inner">
            <p className="awards-eyebrow">Awards Archive</p>
            <h1>IEEE SPS Kerala Chapter Awards</h1>
            <p>
              A reverse-chronological archive of chapter honors, with each
              recipient presented as a single card to keep the recognition
              focused, clear, and celebratory.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="awards-loading">Loading awards...</div>
        ) : error ? (
          <div className="awards-empty">{error}</div>
        ) : awards.length === 0 ? (
          <div className="awards-empty">No awards have been published yet.</div>
        ) : (
          <div className="awards-archive">
            {Object.entries(groupAwardsByYear(awards))
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, yearAwards]) => (
                <section className="award-year-group" key={year} aria-labelledby={`award-year-${year}`}>
                  <header className="award-year-header">
                    <div>
                      <p className="award-year-kicker">Year</p>
                      <h2 id={`award-year-${year}`} className="award-year-number">
                        {year}
                      </h2>
                    </div>
                    <span className="award-year-divider" aria-hidden="true" />
                  </header>

                  <div className="awards-grid" aria-label={`Awards for ${year}`}>
                    {yearAwards.map((award) => (
                      <AwardCard key={award._id} award={award} />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}

function AwardCard({ award }) {
  const IconComponent = iconMap[award.icon] || AwardIcon;
  const initials = getInitials(award.recipient || award.name || "AW");

  return (
    <article className="award-card">
      {award.image ? (
        <div className="award-card__media">
          <img
            src={urlFor(award.image)}
            alt={award.name}
            className="award-card__image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/800x480/EAF1FC/1A56DB?text=Award+Image";
            }}
          />
        </div>
      ) : null}
      <div className="award-card__header">
        <div className="award-card__avatar" aria-hidden="true">
          <span>{initials}</span>
        </div>
        <div className="award-card__heading">
          <p className="award-card__badge">
            <IconComponent size={14} aria-hidden="true" />
            <span>{award.name}</span>
          </p>
          <h3 className="award-card__title">{award.recipient}</h3>
          <p className="award-card__affiliation">{chapterAffiliation}</p>
        </div>
      </div>
      {award.description ? (
        <p className="award-card__description">{award.description}</p>
      ) : null}
    </article>
  );
}

export default Awards;
