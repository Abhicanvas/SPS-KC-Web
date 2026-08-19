import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/client";
import "./awards.css";

const chapterAffiliation = "IEEE SPS Kerala Chapter";
const heroImage = "/img/events/gal1.webp";
const defaultYears = [2025, 2024];
const socialLinks = [
  { label: "X", href: "https://x.com/ieeespskerala", icon: faXTwitter },
  { label: "Facebook", href: "https://www.facebook.com/ieeespskerala", icon: faFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/ieeespskerala", icon: faInstagram },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-sps-kerala-chapter",
    icon: faLinkedinIn,
  },
];

const { projectId, dataset } = client.config();
const builder = projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
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

function buildYearCards(year, awardsForYear) {
  const cards = [...awardsForYear];

  if (cards.length < 6) {
    const remainingSlots = 6 - cards.length;

    for (let index = 0; index < remainingSlots; index += 1) {
      cards.push({
        _id: `placeholder-${year}-${index}`,
        year,
        name: `Award spotlight ${index + 1}`,
        recipient: "Placeholder image slot",
        description: "Reserve this tile for a future award image or recognition poster.",
        isPlaceholder: true,
      });
    }
  }

  return cards;
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

  const yearGroups = useMemo(() => {
    const awardsByYear = groupAwardsByYear(awards);
    const fetchedYears = Object.keys(awardsByYear)
      .map((year) => Number(year))
      .filter((year) => Number.isFinite(year));

    const years = Array.from(new Set([...defaultYears, ...fetchedYears])).sort((yearA, yearB) => yearB - yearA);

    return years.map((year) => ({
      year,
      awards: buildYearCards(year, awardsByYear[year] || []),
    }));
  }, [awards]);

  return (
    <main className="awards-page">
      <header className="awards-hero">
        <div className="awards-hero__backdrop" aria-hidden="true" />
        <img
          className="awards-hero__image"
          src={heroImage}
          alt="IEEE SPS Kerala Chapter members in a conference room"
        />

        <div className="awards-shell awards-hero__shell">
          <div className="awards-hero__inner">
            <div className="awards-hero__copy">
              <p className="awards-hero__eyebrow">Awards archive</p>
              <h1 className="awards-hero__title">
                <span>IEEE</span>
                <span>SPS KERALA CHAPTER</span>
              </h1>
              <p className="awards-hero__summary">
                A photographic archive of chapter recognition, member excellence, and society milestones across the years.
              </p>
            </div>

            <div className="awards-hero__socials" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="awards-hero__social"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="awards-page__accent awards-page__accent--bottom" aria-hidden="true" />
      </header>

      <section className="awards-shell awards-content" aria-labelledby="awards-recognition-title">
        <div className="awards-section-heading">
          <p className="awards-section-heading__eyebrow">Section Awards</p>
          <h2 id="awards-recognition-title">Awards &amp; Recognition</h2>
          <p className="awards-section-heading__copy">
            A clean, chronological showcase of awards by year, with room for future recognitions and archived highlights.
          </p>
        </div>

        {loading ? <div className="awards-loading">Loading awards archive...</div> : null}
        {error ? <div className="awards-empty">{error}</div> : null}

        <div className="award-year-groups">
          {yearGroups.map(({ year, awards: yearAwards }) => (
            <section className="award-year-group" key={year} aria-labelledby={`award-year-${year}`}>
              <h3 id={`award-year-${year}`} className="award-year-title">
                Awards {year}
              </h3>

              <div className="awards-grid" aria-label={`Awards for ${year}`}>
                {yearAwards.map((award) => (
                  <AwardCard key={award._id} award={award} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function AwardCard({ award }) {
  const isPlaceholder = Boolean(award.isPlaceholder);

  return (
    <article className={`award-card${isPlaceholder ? " award-card--placeholder" : ""}`}>
      <div className="award-card__media">
        {award.image ? (
          <img
            src={urlFor(award.image)}
            alt={award.name || award.recipient || "Award image"}
            className="award-card__image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/800x800/A8E6CF/1B5FA8?text=Award+Image";
            }}
          />
        ) : (
          <div className="award-card__placeholder" aria-hidden="true">
            <div className="award-card__placeholder-glow" />
            <span>{award.year || "Award"}</span>
          </div>
        )}
      </div>

      <div className="award-card__header">
        <div className="award-card__heading">
          <p className="award-card__badge">
            <span>{isPlaceholder ? "Placeholder" : award.name}</span>
          </p>
          <h4 className="award-card__title">{isPlaceholder ? "Placeholder image slot" : award.recipient}</h4>
          <p className="award-card__affiliation">{chapterAffiliation}</p>
        </div>
      </div>

      {/* Description removed per request (hide brief text under cards) */}
    </article>
  );
}

export default Awards;
