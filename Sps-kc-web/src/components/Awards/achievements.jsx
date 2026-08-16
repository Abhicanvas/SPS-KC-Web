import React, { useEffect, useMemo, useState } from "react";
import { Award as AwardIcon, Calendar, Sparkles, UserRound } from "lucide-react";
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

const iconMap = {
  Award: AwardIcon,
  Sparkles,
  UserRound,
};

const chapterAffiliation = "IEEE SPS Kerala Chapter";
const heroImage = "/img/events/gal1.webp";
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

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getYearLabel(date) {
  if (!date) return "Recent";

  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? "Recent" : parsedDate.getFullYear().toString();
}

function groupAchievementsByYear(items) {
  return items.reduce((groups, item) => {
    const year = getYearLabel(item.date);

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(item);
    return groups;
  }, {});
}

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "achievement" && defined(name)] | order(date desc) {
          _id,
          name,
          date,
          description,
          icon,
          image
        }`
      )
      .then((data) => {
        setAchievements(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setError("Unable to load achievements right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const yearGroups = useMemo(() => {
    const achievementsByYear = groupAchievementsByYear(achievements);
    const years = Object.keys(achievementsByYear).sort((yearA, yearB) => Number(yearB) - Number(yearA));

    return years.map((year) => ({
      year,
      achievements: achievementsByYear[year],
    }));
  }, [achievements]);

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
              <p className="awards-hero__eyebrow">Achievements</p>
              <h1 className="awards-hero__title">
                <span>IEEE</span>
                <span>SPS KERALA CHAPTER</span>
              </h1>
              <p className="awards-hero__summary">
                A visual archive of chapter milestones, recognitions, and standout accomplishments from across the years.
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

      <section className="awards-shell awards-content" aria-labelledby="achievements-title">
        <div className="awards-section-heading">
          <p className="awards-section-heading__eyebrow">Section Achievements</p>
          <h2 id="achievements-title">Achievements &amp; Highlights</h2>
          <p className="awards-section-heading__copy">
            A polished gallery of chapter milestones, member accomplishments, and memorable moments captured in poster and content form.
          </p>
        </div>

        {loading ? <div className="awards-loading">Loading achievements...</div> : null}
        {error ? <div className="awards-empty">{error}</div> : null}

        {!loading && !error && achievements.length === 0 ? (
          <div className="awards-empty">No achievements have been published yet.</div>
        ) : null}

        <div className="award-year-groups">
          {yearGroups.map(({ year, achievements: yearAchievements }) => (
            <section className="award-year-group" key={year} aria-labelledby={`achievement-year-${year}`}>
              <h3 id={`achievement-year-${year}`} className="award-year-title">
                Achievements {year}
              </h3>

              <div className="awards-grid" aria-label={`Achievements for ${year}`}>
                {yearAchievements.map((achievement) => (
                  <AchievementCard key={achievement._id} achievement={achievement} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function AchievementCard({ achievement }) {
  const IconComponent = iconMap[achievement.icon] || AwardIcon;
  const initials = getInitials(achievement.name || "ACH");
  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <article className="award-card">
      <div className="award-card__media">
        {achievement.image ? (
          <img
            src={urlFor(achievement.image)}
            alt={achievement.name}
            className="award-card__image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/800x800/A8E6CF/1B5FA8?text=Achievement+Image";
            }}
          />
        ) : (
          <div className="award-card__placeholder" aria-hidden="true">
            <div className="award-card__placeholder-glow" />
            <span>{achievement.date ? new Date(achievement.date).getFullYear() : "Achievement"}</span>
          </div>
        )}
      </div>

      <div className="award-card__header">
        <div className="award-card__avatar" aria-hidden="true">
          <span>{initials}</span>
        </div>
        <div className="award-card__heading">
          <p className="award-card__badge">
            <IconComponent size={14} aria-hidden="true" />
            <span>{achievement.name}</span>
          </p>
          <h4 className="award-card__title">{achievement.name}</h4>
          <p className="award-card__affiliation">{chapterAffiliation}</p>
        </div>
      </div>

      <div className="award-card__meta">
        {formattedDate ? (
          <p className="award-card__meta-row">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </p>
        ) : null}
      </div>

      {/* Description removed per request (hide brief text under cards) */}
    </article>
  );
}

export default Achievements;
