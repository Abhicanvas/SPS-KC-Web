import React, { useEffect, useState } from "react";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sortByRolePriority } from "./rolePriority";
import Footer from "../footer/footer";
import "./team.css";

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

function MemberCard({ member }) {
  const imageUrl =
    member.image && member.image.asset ? urlFor(member.image).url() : null;
  const isStudent = member.professional === false || member.professional === "false";

  return (
    <article className="team-card">
      <div className="team-card__imageWrap">
        {imageUrl ? (
          <img
            className="team-card__image"
            src={imageUrl}
            alt={member.title || "Team member"}
            loading="lazy"
          />
        ) : (
          <div className="team-card__placeholder" />
        )}
        <div className="team-card__accent" aria-hidden="true" />
      </div>
      <div className="team-card__copy">
        <h3>{member.title || "—"}</h3>
        <p className="team-card__role">{member.role || ""}</p>
        {isStudent && member.bio && (
          <p className="team-card__college">{member.bio}</p>
        )}
      </div>
    </article>
  );
}

export default function Team() {
  const [professionals, setProfessionals] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(
          `*[
            _type == "officeBearer" &&
            year == $year &&
            defined(image.asset) &&
            slug.current match "*-26"
          ] {
            _id,
            title,
            image,
            professional,
            role,
            bio
          }`,
          { year: 2026 }
        );

        const profs = sortByRolePriority(
          data.filter(
            (m) => m.professional === true || m.professional === "true"
          )
        );
        const studs = sortByRolePriority(
          data.filter(
            (m) => m.professional === false || m.professional === "false"
          )
        );

        setProfessionals(profs);
        setStudents(studs);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <main className="team-page">
        {/* ── Hero ── */}
        <section className="team-page__hero" aria-labelledby="execom-26-title">
          <div className="team-page__heroOverlay" />
          <div className="team-page__heroContent">
            <div className="team-page__heroBadge">
              <img
                src="/img/logo/sps kc png.png"
                alt="IEEE SPS Kerala Chapter"
                className="team-page__heroLogo"
              />
              <span className="team-page__heroBadgeText">
                IEEE
                <br />
                <strong>
                  Kerala Section
                  <br />
                  Kochi
                </strong>
              </span>
            </div>
            <h1 id="execom-26-title">
              IEEE <span className="team-page__heroAccent">SPS Kerala Chapter</span>
            </h1>
          </div>
          <div className="team-page__heroSocials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0 0 22.46 6z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
          </div>
        </section>

        {/* ── EXECOM 26 title ── */}
        <div className="team-page__titleBar">
          <h2 className="team-page__mainTitle">EXECOM 26</h2>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="team-page__loading">
            <div className="team-page__spinner" />
            <p>Loading team data&hellip;</p>
          </div>
        )}

        {/* ── Professionals ── */}
        {!loading && professionals.length > 0 && (
          <section className="team-page__section" id="professionals">
            <h2 className="team-page__sectionTitle">Professionals</h2>
            <div
              className="team-page__grid"
              aria-label="Professional body members"
            >
              {professionals.map((member, index) => (
                <MemberCard
                  key={member._id || `prof-${index}`}
                  member={member}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Students ── */}
        {!loading && students.length > 0 && (
          <section
            className="team-page__section team-page__section--students"
            id="students"
          >
            <h2 className="team-page__sectionTitle">Student</h2>
            <div
              className="team-page__grid"
              aria-label="Student team members"
            >
              {students.map((member, index) => (
                <MemberCard
                  key={member._id || `stud-${index}`}
                  member={member}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── No data state ── */}
        {!loading && professionals.length === 0 && students.length === 0 && (
          <div className="team-page__empty">
            <p>No team members found for 2026 yet. Check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
