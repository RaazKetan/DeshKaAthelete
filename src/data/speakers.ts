// Crests — speaker dataset (fictional names; story-driven)
// Ported from prototype's data.jsx.

export interface Achievement {
  year: string;
  label: string;
}

export interface Speaker {
  id: string;
  name: string;
  handle: string;
  category: string;
  sport: string;
  location: string;
  languages: string[];
  fee: number;
  feeRange: string;
  rating: number;
  sessions: number;
  verified: boolean;
  headline: string;
  story: string;
  topics: string[];
  formats: string[];
  achievements: Achievement[];
  seed: number;
  tone: "ink" | "light";
  accent: string;
}

export const SPEAKERS: Speaker[] = [
  {
    id: "meera-rajaram",
    name: "Meera Rajaram",
    handle: "Olympic Hockey Forward",
    category: "Athlete",
    sport: "Field Hockey",
    location: "Bengaluru · Karnataka",
    languages: ["English", "Hindi", "Tamil"],
    fee: 220000,
    feeRange: "₹2.2L – 4.5L",
    rating: 4.9,
    sessions: 47,
    verified: true,
    headline: "Three Olympics, one bronze, and the village that built her.",
    story:
      "I picked up a hockey stick because there was no money for a new uniform. Twenty-two years later I held an Olympic bronze in Tokyo. The kids I speak to don't need motivation — they need a map.",
    topics: ["Resilience", "Team building", "Women in sport", "Discipline"],
    formats: ["1:1 Mentoring", "Group session", "Keynote", "Workshop"],
    achievements: [
      { year: "2024", label: "Asian Games — Gold" },
      { year: "2021", label: "Tokyo Olympics — Bronze" },
      { year: "2018", label: "Padma Shri" },
      { year: "2016", label: "Rio Olympics — Quarterfinalist" },
    ],
    seed: 3,
    tone: "ink",
    accent: "01 Athlete",
  },
  {
    id: "kabir-sehgal",
    name: "Dr. Kabir Sehgal",
    handle: "Cardiothoracic Surgeon",
    category: "Doctor",
    sport: "Medicine",
    location: "New Delhi",
    languages: ["English", "Hindi", "Punjabi"],
    fee: 350000,
    feeRange: "₹3.5L – 6L",
    rating: 4.95,
    sessions: 33,
    verified: true,
    headline: "Performed India's first paediatric heart transplant on an infant under 6 months.",
    story:
      "A surgeon's hands learn from failure, not success. I tell young doctors what no textbook will: how to lose a patient, write the letter, and operate again the next morning.",
    topics: ["Medical ethics", "High-stakes decisions", "Public health", "Burnout"],
    formats: ["Keynote", "Panel", "Workshop"],
    achievements: [
      { year: "2023", label: "Padma Bhushan" },
      { year: "2022", label: "WHO Advisory Council" },
      { year: "2019", label: "AIIMS Director's Excellence" },
    ],
    seed: 1,
    tone: "ink",
    accent: "02 Medicine",
  },
  {
    id: "arjun-bhatia",
    name: "Arjun Bhatia",
    handle: "Founder · ThermoLogix",
    category: "Business",
    sport: "Climate-tech",
    location: "Mumbai",
    languages: ["English", "Hindi", "Marathi"],
    fee: 480000,
    feeRange: "₹4.8L – 8L",
    rating: 4.87,
    sessions: 28,
    verified: true,
    headline: "Built India's largest cold-chain network. Represented India at COP28.",
    story:
      'When I started, "logistics" meant trucks. Today it means protecting 40 million vaccine doses. I talk about building from a Tier-2 city, hiring before product, and saying no to bad capital.',
    topics: ["Founding from India", "Climate", "Scaling teams", "Public-private"],
    formats: ["Keynote", "1:1 Mentoring", "Fireside chat"],
    achievements: [
      { year: "2025", label: "Forbes India Leader" },
      { year: "2023", label: "COP28 Indian Delegation" },
      { year: "2021", label: "NASSCOM Founder of the Year" },
    ],
    seed: 0,
    tone: "ink",
    accent: "03 Business",
  },
  {
    id: "lata-deshmukh",
    name: "Capt. Lata Deshmukh",
    handle: "IAF · Mig-29 Combat Pilot",
    category: "Defence",
    sport: "Indian Air Force",
    location: "Pune · Maharashtra",
    languages: ["English", "Hindi", "Marathi"],
    fee: 180000,
    feeRange: "₹1.8L – 3.5L",
    rating: 4.92,
    sessions: 52,
    verified: true,
    headline: "One of seven women combat pilots commissioned in 2018. 1,400+ flight hours.",
    story:
      "My grandmother walked 14km to school in Satara. I fly Mach 2. A flight suit is just a school uniform that grew up. I tell girls: the cockpit was always yours, the keys are just slow.",
    topics: ["Discipline", "Women in defence", "Operating under pressure", "Service"],
    formats: ["Keynote", "Group session", "Workshop"],
    achievements: [
      { year: "2024", label: "Vayu Sena Medal" },
      { year: "2022", label: "Republic Day Flypast — Lead" },
      { year: "2018", label: "Permanent Commission" },
    ],
    seed: 2,
    tone: "ink",
    accent: "04 Defence",
  },
  {
    id: "rhea-pillai",
    name: "Rhea Pillai",
    handle: "Documentary Filmmaker",
    category: "Creator",
    sport: "Film & journalism",
    location: "Kochi · Kerala",
    languages: ["English", "Malayalam", "Hindi", "French"],
    fee: 140000,
    feeRange: "₹1.4L – 2.8L",
    rating: 4.84,
    sessions: 61,
    verified: true,
    headline: "Cannes Documentary jury 2025. 2.4M followers across platforms.",
    story:
      "I made my first short on a borrowed phone in a Kochi backwater. Now I have a Netflix deal and 2.4 million people who think I have it figured out. I don't. That's the talk.",
    topics: ["Storytelling", "Building an audience", "Creative discipline", "Independent media"],
    formats: ["Workshop", "1:1 Mentoring", "Keynote"],
    achievements: [
      { year: "2025", label: "Cannes — Jury, Documentary" },
      { year: "2024", label: "Netflix India Original" },
      { year: "2022", label: "Sundance — Special Mention" },
    ],
    seed: 2,
    tone: "ink",
    accent: "05 Creator",
  },
  {
    id: "sanjay-iyer",
    name: "Amb. Sanjay Iyer (Retd.)",
    handle: "Former Indian Ambassador to Japan",
    category: "Diplomat",
    sport: "Foreign service",
    location: "New Delhi",
    languages: ["English", "Hindi", "Japanese", "French"],
    fee: 260000,
    feeRange: "₹2.6L – 4.8L",
    rating: 4.91,
    sessions: 38,
    verified: true,
    headline: "34 years in IFS. Negotiated the 2019 India-Japan critical minerals accord.",
    story:
      "Diplomacy is the long game played in a short suit. I share what I learned in Tokyo dinner rooms and Geneva corridors — and why patience is India's most underrated export.",
    topics: ["Geopolitics", "Negotiation", "Public service", "Indo-Pacific"],
    formats: ["Keynote", "Panel", "Fireside chat"],
    achievements: [
      { year: "2022", label: "Padma Shri" },
      { year: "2019", label: "Japan-India Critical Minerals" },
      { year: "2014", label: "Ambassador to Japan" },
    ],
    seed: 1,
    tone: "ink",
    accent: "06 Diplomat",
  },
  {
    id: "priya-konkar",
    name: "Priya Konkar",
    handle: "Carnatic Vocalist",
    category: "Artist",
    sport: "Classical music",
    location: "Chennai · Tamil Nadu",
    languages: ["English", "Tamil", "Sanskrit", "Hindi"],
    fee: 210000,
    feeRange: "₹2.1L – 4L",
    rating: 4.96,
    sessions: 24,
    verified: true,
    headline: "Performed at Carnegie Hall. Madras Music Academy Sangita Kalanidhi awardee.",
    story:
      "I learned from my grandmother by humming her dishes. Tradition isn't a museum — it's a recipe. I talk about how 2000-year-old forms stay alive when the world won't sit still.",
    topics: ["Craft & mastery", "Cultural heritage", "Mentorship", "Discipline"],
    formats: ["Keynote", "Workshop", "Performance + Q&A"],
    achievements: [
      { year: "2024", label: "Sangita Kalanidhi" },
      { year: "2022", label: "Carnegie Hall debut" },
      { year: "2018", label: "Sangeet Natak Akademi" },
    ],
    seed: 2,
    tone: "ink",
    accent: "07 Artist",
  },
  {
    id: "vikrant-mathur",
    name: "Vikrant Mathur",
    handle: "Author · Booker shortlist 2024",
    category: "Author",
    sport: "Literature",
    location: "Jaipur · Rajasthan",
    languages: ["English", "Hindi", "Urdu"],
    fee: 160000,
    feeRange: "₹1.6L – 3L",
    rating: 4.82,
    sessions: 19,
    verified: true,
    headline: "Booker Prize shortlist 2024. Translated into 17 languages.",
    story:
      "Every novel I've written started as a question I couldn't Google. I tell young writers about the years before the publisher said yes — and why they were the best ones.",
    topics: ["Writing craft", "Long-form thinking", "Cultural identity", "Failure"],
    formats: ["Keynote", "Workshop", "Reading + Q&A"],
    achievements: [
      { year: "2024", label: "Booker Prize — Shortlist" },
      { year: "2022", label: "Sahitya Akademi" },
      { year: "2019", label: "JCB Prize for Literature" },
    ],
    seed: 0,
    tone: "ink",
    accent: "08 Author",
  },
];

export interface Category {
  id: string;
  label: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", count: SPEAKERS.length },
  { id: "Athlete", label: "Athletes", count: SPEAKERS.filter((s) => s.category === "Athlete").length },
  { id: "Doctor", label: "Doctors & Scientists", count: SPEAKERS.filter((s) => s.category === "Doctor").length },
  { id: "Business", label: "Business Leaders", count: SPEAKERS.filter((s) => s.category === "Business").length },
  { id: "Defence", label: "Defence", count: SPEAKERS.filter((s) => s.category === "Defence").length },
  { id: "Creator", label: "Content Creators", count: SPEAKERS.filter((s) => s.category === "Creator").length },
  { id: "Diplomat", label: "Diplomats", count: SPEAKERS.filter((s) => s.category === "Diplomat").length },
  { id: "Artist", label: "Artists", count: SPEAKERS.filter((s) => s.category === "Artist").length },
  { id: "Author", label: "Authors", count: SPEAKERS.filter((s) => s.category === "Author").length },
];

export const TOPICS = [
  "Resilience", "Leadership", "Storytelling", "Discipline", "Public service",
  "Climate", "Women in leadership", "Failure", "Craft & mastery", "Negotiation",
];

export const LANGUAGES = [
  "English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali",
  "Malayalam", "Punjabi", "Kannada", "Gujarati",
];

export const FORMATS = ["Keynote", "Workshop", "1:1 Mentoring", "Group session", "Fireside chat", "Panel"];

export const REGIONS = ["North", "South", "East", "West", "Northeast"];

// helper: format fee
export function formatFee(n: number): string {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1).replace(/\.0$/, "") + " L";
  return "₹" + n.toLocaleString("en-IN");
}
