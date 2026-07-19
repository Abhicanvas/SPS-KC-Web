import React, { useEffect, useState } from "react";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sortByRolePriority } from "./rolePriority";

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

function TeamGrid({ title, team }) {
  return (
    <div className="mx-auto flex align-middle justify-center px-20 p-5">
      <div>
        <h2 className="text-4xl text-center text-black font-bold mb-4 py-7">
          {title}
        </h2>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {team.map((member) => {
            const imageUrl =
              member.image && member.image.asset
                ? urlFor(member.image).url()
                : null;
            return (
              <div
                key={member._id}
                style={{
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt=""
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Execom25InlineTeam({ members, loading }) {
  const [items, setItems] = useState(1);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  const studentTeam = sortByRolePriority(
    members.filter(
      (member) => member.professional === false || member.professional === "false"
    )
  );
  const professionalBody = sortByRolePriority(
    members.filter(
      (member) => member.professional === true || member.professional === "true"
    )
  );

  const activeTeam = items === 0 ? studentTeam : professionalBody;
  const teamSize = activeTeam.length;
  const cardImageClass =
    teamSize <= 2
      ? "w-full min-w-0 h-auto object-contain"
      : "mt-[30px] h-[220px] w-full min-w-[200px] rounded-xl object-contain";

  const renderCard = (item, index) => (
    <div
      key={item._id || index}
      className={`flex w-[300px] flex-col items-center justify-center ${teamSize <= 2 ? "members-large w-full min-w-[280px]" : ""}`}
    >
      <img
        src={item.image && item.image.asset ? urlFor(item.image).url() : items === 0 ? "img/team/image.png" : "img/team/random1.png"}
        alt="team member"
        className={cardImageClass}
      />
      <h3 className={`${teamSize <= 2 ? "hidden" : "text-center text-[32px]"}`}>
        {item.title}
      </h3>
      <p className={`${teamSize <= 2 ? "hidden" : "text-center text-[24px] text-[#007a78]"}`}>
        {item.role}
      </p>
    </div>
  );

  return (
    <div className="team flex w-full justify-center bg-white text-black">
      <div className="slt mt-[100px] flex w-[80%] flex-col items-center max-[768px]:w-[90%]">
        <h1 className="text-center font-['Outfit',sans-serif] text-[64px] max-[768px]:text-[64px]">
          <span className="font-['Outfit',sans-serif] font-light">Meet the</span> Team
        </h1>
        <div className="types mt-5 flex gap-[200px] max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-5">
          <button type="button" onClick={() => setItems(1)}>
            <h3
              className={`px-[10px] font-['Outfit',sans-serif] text-[32px] max-[768px]:text-[24px] ${items === 1 ? "bg-[#001E40] text-white" : "bg-white text-black"}`}
            >
              Professional Body
            </h3>
          </button>
          <button type="button" onClick={() => setItems(0)}>
            <h3
              className={`px-[10px] font-['Outfit',sans-serif] text-[32px] max-[768px]:text-[24px] ${items === 0 ? "bg-[#001E40] text-white" : "bg-white text-black"}`}
            >
              Student Team
            </h3>
          </button>
        </div>
        <div className={`members flex flex-wrap justify-center gap-[30px] max-[768px]:flex-col max-[768px]:items-center ${teamSize <= 2 ? "members-large flex-col" : ""}`}>
          {activeTeam.map(renderCard)}
        </div>
      </div>
    </div>
  );
}

function Execom22InlineTeam({ members, loading }) {
  const [items, setItems] = useState(1);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  const studentTeam = sortByRolePriority(
    members.filter(
      (member) => member.professional === false || member.professional === "false"
    )
  );
  const professionalBody = sortByRolePriority(
    members.filter(
      (member) => member.professional === true || member.professional === "true"
    )
  );

  const activeTeam = items === 0 ? studentTeam : professionalBody;
  const teamSize = activeTeam.length;

  const renderCard = (item, index) => (
    <div
      key={item._id || index}
      className={`flex w-[300px] flex-col items-center justify-center ${teamSize <= 2 ? "w-full min-w-[280px]" : ""}`}
    >
      <img
        src={item.image && item.image.asset ? urlFor(item.image).url() : items === 0 ? "img/team/image.png" : "img/team/random1.png"}
        alt="team member"
        className={`object-contain ${teamSize <= 2 ? "w-full min-w-0 h-auto" : "mt-[30px] h-[220px] w-full min-w-[200px] rounded-xl"}`}
      />
      <h3 className={`${teamSize <= 2 ? "hidden" : "text-center text-[32px]"}`}>
        {item.title}
      </h3>
      <p className={`${teamSize <= 2 ? "hidden" : "text-center text-[24px] text-[#007a78]"}`}>
        {item.role}
      </p>
    </div>
  );

  return (
    <div className="team flex w-full justify-center bg-white text-black">
      <div className="slt mt-[100px] flex w-[80%] flex-col items-center max-[768px]:w-[90%]">
        <h1 className="text-center font-['Outfit',sans-serif] text-[64px]">
          <span className="font-['Outfit',sans-serif] font-light">Meet the</span> Team
        </h1>
        <div className="types mt-5 flex gap-[200px] max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-5">
          <button type="button" onClick={() => setItems(1)}>
            <h3
              className={`px-[10px] font-['Outfit',sans-serif] text-[32px] max-[768px]:text-[24px] ${items === 1 ? "bg-[#001E40] text-white" : "bg-white text-black"}`}
            >
              Professional Body
            </h3>
          </button>
          <button type="button" onClick={() => setItems(0)}>
            <h3
              className={`px-[10px] font-['Outfit',sans-serif] text-[32px] max-[768px]:text-[24px] ${items === 0 ? "bg-[#001E40] text-white" : "bg-white text-black"}`}
            >
              Student Team
            </h3>
          </button>
        </div>
        <div className={`members flex flex-wrap justify-center gap-[30px] max-[768px]:flex-col max-[768px]:items-center ${teamSize <= 2 ? "members-large flex-col" : ""}`}>
          {activeTeam.map(renderCard)}
        </div>
      </div>
    </div>
  );
}

export default function PastTeam({ year }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const query =
          year === 2025
            ? `*[
                _type == "officeBearer" &&
                year == $year &&
                defined(image.asset) &&
                slug.current match "*-photo"
              ] {
                _id,
                title,
                image,
                professional,
                role
              }`
            : `*[
                _type == "officeBearer" &&
                year == $year &&
                defined(image.asset) &&
                !(slug.current match "*-photo") &&
                !(defined(image.asset->slug.current))
              ] {
                _id,
                title,
                image,
                professional,
                role
              }`;

        const data = await client.fetch(
          query,
          { year }
        );
        setMembers(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [year]);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  if (year === 2022) {
    return <Execom22InlineTeam members={members} loading={false} />;
  }

  if (year === 2025) {
    return <Execom25InlineTeam members={members} loading={false} />;
  }

  const professionals = sortByRolePriority(
    members.filter((m) => m.professional === true || m.professional === "true")
  );
  const nonProfessionals = sortByRolePriority(
    members.filter(
      (m) => m.professional === false || m.professional === "false"
    )
  );

  return (
    <main className="mx-auto px-20 py-10">
      <h1 className="text-4xl text-center sm:text-5xl font-extrabold text-blue-800 mb-4 tracking-tight">
        Meet the team of {year}
      </h1>
      {/* <h2 className="text-4xl text-center text-black font-bold mb-4">
        Professionals
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        {professionals.map((member) => {
          const imageUrl =
            member.image && member.image.asset
              ? urlFor(member.image).url()
              : null;
          return (
            <div
              key={member._id}
              style={{
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt=""
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          );
        })}
      </div> */}
      <TeamGrid title="Professional Team" team={professionals} />
      <TeamGrid title="Student Team" team={nonProfessionals} />
      {/* <h2 className="text-4xl text-center text-black font-bold mb-4 mt-12">
        Student Team
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        {nonProfessionals.map((member) => {
          const imageUrl =
            member.image && member.image.asset
              ? urlFor(member.image).url()
              : null;
          return (
            <div
              key={member._id}
              style={{
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt=""
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
          );
        })}
      </div> */}
    </main>
  );
}
