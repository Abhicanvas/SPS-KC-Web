import React, { useEffect, useState } from "react";
import {
  Award as AwardIcon,
  Calendar,
  UserRound,
  Sparkles,
} from "lucide-react";
import {client} from "../../sanity/client"; // Adjust path as needed
import imageUrlBuilder from "@sanity/image-url";
import "./awards.css";

// Icon mapping for lucide-react
const iconMap = {
  Award: <AwardIcon className="text-blue-600" size={28} />,
  Sparkles: <Sparkles className="text-yellow-500" size={28} />,
  UserRound: <UserRound className="text-green-600" size={28} />,
};

const { projectId, dataset } = client.config();
const builder =
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
    : imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).url();
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
            <p className="awards-eyebrow">Awards</p>
            <h1>IEEE SPS Kerala Chapter Awards</h1>
            <p>
              Highlighting the distinguished contributions of our chapter,
              students, and collaborators across the IEEE community.
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
          <section className="awards-grid" aria-label="Awards list">
            {awards.map((award) => (
              <AwardCard key={award._id} award={award} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

// AwardCard Component to display individual award details
function AwardCard({ award }) {
  // Fallback to Award icon if not mapped
  const IconComponent = iconMap[award.icon] || (
    <AwardIcon className="text-blue-600" size={28} />
  );
  return (
    <article className="award-card">
      {award.image && (
        <img
          src={urlFor(award.image)}
          alt={award.name}
          className="award-card__image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x200/CCCCCC/000000?text=Image+Error";
          }}
        />
      )}
      <div className="award-card__header">
        <div className="award-card__icon">{IconComponent}</div>
        <h3 className="award-card__title">{award.name}</h3>
      </div>
      <div className="award-card__meta">
        <p className="award-card__meta-row">
          <UserRound size={16} />
          <span>{award.recipient}</span>
        </p>
        <p className="award-card__meta-row">
          <Calendar size={16} />
          <span>{award.year}</span>
        </p>
      </div>
      {award.description ? <p className="award-card__description">{award.description}</p> : null}
    </article>
  );
}

export default Awards;
