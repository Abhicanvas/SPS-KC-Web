export const featuredEventRecords = [
  {
    slug: "signal-4-0",
    title: "SIGNAL 4.0",
    tag: "FLAGSHIP",
    mode: "flagship",
    date: "24–26 OCT 2025",
    venue: "KERALA, INDIA · IN-PERSON",
    description:
      "The chapter's flagship three-day gathering brings keynote sessions, hands-on tracks, and networking together for signal-processing students across Kerala.",
    history:
      "SIGNAL 4.0 is the SPS Kerala Chapter's biggest event of the cycle. The program is designed as a three-day chapter anchor, combining keynote talks, hands-on tracks, and peer networking for students, researchers, and professionals across Kerala.",
    highlights: ["3-day event", "Fully in-person", "Chapter flagship"],
    image: "/img/main-event/signal.png",
    alt: "SIGNAL 4.0 main event poster",
  },
  {
    slug: "s2s",
    title: "S2S",
    tag: "PENDING",
    mode: "pending",
    date: "ADD DATE",
    venue: "ADD VENUE",
    description:
      "Placeholder copy for the S2S event. Final date, venue, and program details will be added once the information is verified.",
    history:
      "Details pending. This record is reserved for the finalized S2S program and will be updated once the chapter confirms the event metadata.",
    highlights: ["Details pending", "Date TBD", "Venue TBD"],
    image: "/img/main-event/s2s.png",
    alt: "S2S placeholder graphic",
  },
];

export function getFeaturedEventRecord(slug) {
  return featuredEventRecords.find((record) => record.slug === slug) || null;
}

export function getEventSlug(event) {
  return event?.slug?.current || event?.slug || event?._id || "";
}