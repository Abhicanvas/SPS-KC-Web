export const featuredEventRecords = [
  {
    slug: "signal-4-0",
    title: "SIGNAL 4.0",
    tag: "FLAGSHIP",
    mode: "flagship",
    date: "21–22 FEB 2026",
    venue: "TKM-COLLEGE OF ENGINEERING, KOLLAM · IN-PERSON",
    description:
      "The chapter's flagship three-day gathering brings keynote sessions, hands-on tracks, and networking together for signal-processing students across Kerala.",
    history:
      "SIGNAL 4.0, the flagship event of the IEEE SPS Kerala Chapter, returns with greater energy and excitement, taking place at TKM College of Engineering, Kollam. The fourth edition is a two-day blend of technology, inspiration, and collaboration — spanning hands-on workshops (OpenCV, Drone, ESP NOW, Musical Signal Processing, STM32, RISC-V with FPGA, LT Spice), talk sessions (AI Impact, LinkedIn, Women Empowerment, Prompt Engineering), and special events including a Gala Night, Cultural Eve with live performances, and a motivational session with RJ Sharath.",
    highlights: ["2-day event", "7 hands-on workshops","5 talk sessions", "Chapter flagship"],
    image: "/img/main-event/signal.png",
    alt: "SIGNAL 4.0 main event poster",
  },
  {
    slug: "fusion-2025",
    title: "FUSION 2025",
    tag: "FLAGSHIP · SECTION LEVEL",
    mode: "flagship",
    date: "21–23 FEB 2025",
    venue: "KOTHAMANGALAM, KERALA · IN-PERSON",
    description:
      "A three-day flagship combining technical workshops, talks, and cultural interactions hosted by IEEE SPS SBC MACE in collaboration with IEEE SPS Kerala Chapter.",
    history:
      "FUSION 2025 combined technical workshops, engaging talks, team-building activities, and cultural interactions over three days at Mar Athanasius College of Engineering, hosted by IEEE SPS SBC MACE in collaboration with IEEE SPS Kerala Chapter. It opened with a formal inauguration and an ML-for-signal-processing session, and moved through a career talk, a hands-on Python image-processing workshop, a field trip to Old Bhoothathankettu, an Ideathon on the UN SDGs, and a talk on Signal Processing in Smart Grids before closing with a prize distribution ceremony.",
    details: {
      venue: "Mar Athanasius College of Engineering, Kothamangalam",
      host: "IEEE SPS SBC MACE, in collaboration with IEEE SPS Kerala Chapter",
      attendance: "100+ (40 IEEE Members, 60 Non-IEEE)",
    },
    highlights: ["3-day event", "Fully in-person", "Flagship event"],
    image: "/img/main-event/fusion.jpeg",
    alt: "FUSION 2025 event poster",
  },
  {
    slug: "techfuse-2025",
    title: "TechFuse 2025",
    tag: "FLAGSHIP · CHAPTER DRIVEN INITIATIVE · SECTION LEVEL",
    mode: "flagship",
    date: "8–9 FEB 2025",
    venue: "KOTTAYAM, KERALA · HYBRID",
    description:
      "A two-day hybrid technical program focused on digital systems, Verilog, IoT, and PCB design, hosted by IEEE SPS SBC RIT with IEEE SPS Kerala Chapter.",
    history:
      "TechFuse 2025 gave students hands-on exposure to real-world applications in digital systems and electronics through a two-day hybrid format at Rajiv Gandhi Institute of Technology, hosted by IEEE SPS SBC RIT with IEEE SPS Kerala Chapter. Online pre-events built early excitement, followed by flagship workshops in Verilog, IoT, and PCB Design led by industry experts, a cultural night, and a closing online panel on accelerating AI in electronic systems.",
    details: {
      venue: "Rajiv Gandhi Institute of Technology (RIT), Kottayam",
      host: "IEEE SPS SBC RIT, in association with IEEE SPS Kerala Chapter",
      initiative: "Chapter Driven Initiative — Cycle 2",
      attendance: "91 total (29 IEEE Members, 62 Non-IEEE)",
    },
    highlights: ["2-day hybrid event", "3 hands-on workshops (Verilog, IoT, PCB Design)", "Chapter Driven Initiative"],
    image: "/img/main-event/techfuse.jpeg",
    alt: "TechFuse 2025 event poster",
  },
  {
    slug: "sign2sound",
    title: "SIGN2SOUND ",
    tag: "FLAGSHIP · INNOVATION CHALLENGE · NATIONAL LEVEL · TECHNICAL",
    mode: "flagship",
    date: "27 JUN 2026",
    venue: "THIRUVANANTHAPURAM, KERALA · IN-PERSON",
    description:
      "The grand finale of an innovation challenge using signal processing and AI to improve accessibility for hearing and speech-impaired communities, organized by IEEE SPS Kerala Chapter with NISH and ICFOSS.",
    history:
      "SIGN2SOUND Grand Finale capped off an innovation challenge focused on using signal processing and AI to improve accessibility for the hearing and speech-impaired community. Organized by IEEE SPS Kerala Chapter with NISH and ICFOSS, the finale brought together students, mentors, researchers, and industry experts to see finalist teams present and demo sign-language-to-speech systems.",
    details: {
      venue: "ICFOSS, Thiruvananthapuram",
      host: "IEEE SPS Kerala Chapter, in collaboration with NISH and ICFOSS",
      prizePool: "₹3.8 lakhs total",
      winners: "1st — Team Kaizen (MACE), 2nd — Team Euphoria (Adi Shankara), 3rd — Team ZORA (Adi Shankara)",
    },
    highlights: ["National-level challenge", "₹3.8L prize pool", "Fully in-person finale"],
    image: "/img/main-event/s2s.png",
    alt: "SIGN2SOUND Grand Finale poster",
  },
  
];

export function getFeaturedEventRecord(slug) {
  return featuredEventRecords.find((record) => record.slug === slug) || null;
}

export function getEventSlug(event) {
  return event?.slug?.current || event?.slug || event?._id || "";
}