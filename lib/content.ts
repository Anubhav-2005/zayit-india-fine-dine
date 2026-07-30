import { assetPath } from "@/lib/paths";

export type SourceRef = {
  id: string;
  label: string;
  url: string;
  checkedAt: string;
};

export type RatingSnapshot = {
  platform: string;
  rating: string;
  detail: string;
  href: string;
};

export type MenuCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export type MediaAsset = {
  src: string;
  alt: string;
  label: string;
  rightsStatus: "licensed" | "owner-original" | "owner-original-required";
  width: number;
  height: number;
  objectPosition?: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  checkedAt: string;
  readTime: string;
  paragraphs: string[];
  sourceIds: string[];
};

export const sources: SourceRef[] = [
  {
    id: "google",
    label: "Google Business",
    url: "https://www.google.com/maps?cid=5749341020435167030",
    checkedAt: "2026-07-29",
  },
  {
    id: "instagram",
    label: "Official Instagram",
    url: "https://www.instagram.com/zayitindiafinedine/",
    checkedAt: "2026-07-29",
  },
  {
    id: "zomato",
    label: "Current public menu",
    url: "https://www.zomato.com/jaisalmer/zayit-india-fine-dine-amar-sagar-pol/order",
    checkedAt: "2026-07-29",
  },
  {
    id: "tripadvisor",
    label: "Tripadvisor",
    url: "https://www.tripadvisor.in/Restaurant_Review-g297667-d27171541-Reviews-Zayit_India_Fine_Dine-Jaisalmer_Jaisalmer_District_Rajasthan.html",
    checkedAt: "2026-07-29",
  },
  {
    id: "rajasthan-tourism",
    label: "Rajasthan Tourism",
    url: "https://www.tourism.rajasthan.gov.in/jaisalmer.html",
    checkedAt: "2026-07-29",
  },
];

export const ratings: RatingSnapshot[] = [
  {
    platform: "Google",
    rating: "4.8",
    detail: "490+ public reviews",
    href: sources[0].url,
  },
  {
    platform: "Tripadvisor",
    rating: "5.0",
    detail: "9 traveller reviews",
    href: sources[3].url,
  },
  {
    platform: "Zomato",
    rating: "4.3",
    detail: "delivery rating",
    href: sources[2].url,
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "soups-salads",
    eyebrow: "Soups & salads",
    title: "Begin gently",
    description:
      "A concise opening chapter from the current public menu.",
    items: [
      "Tomato Soup",
      "Mushroom Soup",
      "Sweet Corn Soup",
      "Chicken Shorba",
      "Paneer Salad",
      "Fresh Green Salad",
    ],
  },
  {
    id: "vegetarian-starters",
    eyebrow: "Vegetarian starters",
    title: "Smoke & char",
    description:
      "Paneer, vegetables and kebabs shaped by the tandoor.",
    items: [
      "Paneer Tikka",
      "Paneer Malai Kebab",
      "Lahsuni Paneer Tikka",
      "Dahi ke Kebab",
      "Hara Bhara Kebab",
      "Chilli Paneer Dry",
      "Honey Chilli Potato",
    ],
  },
  {
    id: "non-vegetarian-starters",
    eyebrow: "Non-vegetarian starters",
    title: "From the fire",
    description:
      "Tikkas and kebabs listed on the current delivery menu.",
    items: [
      "Chicken Roasted",
      "Chicken Tikka",
      "Sufiyani Chicken Tikka",
      "Gandhari Chicken Tikka",
      "Lemon Chicken Tikka",
      "Chicken Malai Kebab",
      "Lahsuni Chicken Tikka",
      "Chicken 65",
    ],
  },
  {
    id: "vegetarian-mains",
    eyebrow: "Vegetarian mains",
    title: "Slow & generous",
    description:
      "Paneer, lentils and vegetables for the centre of the table.",
    items: [
      "Dal Makhani",
      "Yellow Dal Tadka",
      "Paneer Butter Masala",
      "Paneer Lababdar",
      "Kadai Paneer",
      "Palak Paneer",
      "Paneer Tikka Masala",
      "Methi Malai Corn",
      "Malai Kofta",
      "Soya Chaap Masala",
    ],
  },
  {
    id: "non-vegetarian-mains",
    eyebrow: "Non-vegetarian mains",
    title: "Handi & spice",
    description:
      "Chicken and mutton curries represented on the live public menu.",
    items: [
      "Butter Chicken",
      "Chicken Lahori",
      "Chicken Curry",
      "Butter Garlic Chicken",
      "Kadhai Chicken",
      "Chicken Korma",
      "Chicken Changezi",
      "Chicken Rara",
      "Mutton Rara",
      "Mutton Korma",
      "Mutton Rogan Josh",
      "Bhuna Mutton",
    ],
  },
  {
    id: "breads-rice",
    eyebrow: "Breads & rice",
    title: "Alongside",
    description:
      "Tandoor breads, rice, biryani and a sharing-format mandi.",
    items: [
      "Tandoori Roti",
      "Butter Roti",
      "Missi Roti",
      "Naan",
      "Garlic Naan",
      "Laccha Paratha",
      "Bajre ki Roti",
      "Cheese Naan",
      "Steamed Rice",
      "Jeera Rice",
      "Dum Veg Biryani",
      "Dum Chicken Biryani",
      "Mutton Biryani",
      "Chicken Mandi · serves four",
    ],
  },
  {
    id: "cafe-drinks",
    eyebrow: "Café & drinks",
    title: "A wider table",
    description:
      "Casual plates and non-alcoholic drinks from the current menu.",
    items: [
      "Kathi Rolls",
      "Sandwiches",
      "Fried Rice",
      "Noodles",
      "Ice Cream",
      "Shakes",
      "Cold Coffee",
      "Cappuccino",
      "Americano",
      "Blue Lagoon",
      "Non-alcoholic Piña Colada",
      "Fresh Lime Soda",
    ],
  },
];

export const guestMentionedDishes = [
  "Laal Maas · ask about availability",
  "Chicken Lahori",
  "Dal Makhani with Butter Roti",
  "Butter Chicken",
  "Chicken Tikka & Kebabs",
];

export const reviewThemes = [
  {
    number: "01",
    title: "The fort-facing terrace",
    copy: "Guests repeatedly mention the outlook toward Jaisalmer Fort and the atmosphere after dusk.",
  },
  {
    number: "02",
    title: "Warm, attentive hosting",
    copy: "Friendly service and considerate attention recur across public review platforms.",
  },
  {
    number: "03",
    title: "Flavour with generosity",
    copy: "Authentic spice, broad choice, satisfying portions and perceived value are frequently noted.",
  },
];

export const galleryAssets: MediaAsset[] = [
  {
    src: assetPath("/images/owner/zayit-room-wide.jpg"),
    alt: "Bright dining room at Zayit India Fine Dine with a long set table",
    label: "The dining room",
    rightsStatus: "owner-original",
    width: 1280,
    height: 575,
    objectPosition: "50% 52%",
  },
  {
    src: assetPath("/images/owner/zayit-table-chandelier-portrait.avif"),
    alt: "Long dining table beneath a chandelier inside Zayit India Fine Dine",
    label: "The long table",
    rightsStatus: "owner-original",
    width: 575,
    height: 1280,
    objectPosition: "50% 45%",
  },
  {
    src: assetPath("/images/owner/zayit-lounge-portrait.avif"),
    alt: "Ivory architectural details and blue lounge seating inside Zayit",
    label: "The lounge",
    rightsStatus: "owner-original",
    width: 1200,
    height: 1450,
    objectPosition: "50% 45%",
  },
  {
    src: assetPath("/images/owner/zayit-table-portrait.avif"),
    alt: "Close view down a polished dining table set with plates and glassware",
    label: "Table details",
    rightsStatus: "owner-original",
    width: 573,
    height: 1280,
    objectPosition: "50% 42%",
  },
  {
    src: assetPath("/images/owner/zayit-fort-daylight-portrait.avif"),
    alt: "Jaisalmer Fort in daylight above terrace plants near Zayit",
    label: "The Golden Fort",
    rightsStatus: "owner-original",
    width: 630,
    height: 1120,
    objectPosition: "50% 42%",
  },
  {
    src: assetPath("/images/owner/zayit-table-window.avif"),
    alt: "Dining table set beside tall softly coloured curtains at Zayit",
    label: "Window light",
    rightsStatus: "owner-original",
    width: 575,
    height: 1020,
    objectPosition: "50% 40%",
  },
  {
    src: assetPath("/images/owner/zayit-fort-sign.avif"),
    alt: "Zayit India sign below the illuminated walls of Jaisalmer Fort",
    label: "Under the fort",
    rightsStatus: "owner-original",
    width: 1280,
    height: 1006,
    objectPosition: "50% 58%",
  },
];

export const nearbyPlaces = [
  {
    distance: "0.17 km",
    name: "Jain Temples",
    note: "Inside Jaisalmer Fort",
    href: "https://www.google.com/maps/search/?api=1&query=Jain+Temples+Jaisalmer",
  },
  {
    distance: "0.30 km",
    name: "Jaisalmer Fort",
    note: "The living golden citadel",
    href: "https://www.google.com/maps/search/?api=1&query=Jaisalmer+Fort",
  },
  {
    distance: "0.85 km",
    name: "Patwon Ki Haveli",
    note: "A cluster of merchant havelis",
    href: "https://www.google.com/maps/search/?api=1&query=Patwon+Ki+Haveli+Jaisalmer",
  },
  {
    distance: "1.4 km",
    name: "Gadisar Lake",
    note: "Historic reservoir and ghats",
    href: "https://www.google.com/maps/search/?api=1&query=Gadisar+Lake+Jaisalmer",
  },
];

export const faqs = [
  {
    question: "Where is Zayit India Fine Dine?",
    answer:
      "On the first floor above the Jaisalmer Art Museum, Fort Parking Road, Dhibba Para, Jaisalmer, Rajasthan 345001. The Google plus code is WW67+J6.",
  },
  {
    question: "What are the opening hours?",
    answer:
      "Zayit’s official Instagram currently states 11:00 AM–12:30 AM, seven days a week. Google may show an earlier 9:30 AM opening, so call for today’s service hours.",
  },
  {
    question: "How do I reserve a table?",
    answer:
      "Call +91 70730 96695, open a pre-filled WhatsApp request to the same public number, or prepare an email request on this website. WhatsApp monitoring is not independently confirmed, and no request becomes a reservation until the restaurant replies.",
  },
  {
    question: "What cuisine does Zayit serve?",
    answer:
      "The restaurant describes itself as Indian and Mediterranean. Its current public delivery menu also spans North Indian, Chinese, biryani, breads, sandwiches, desserts and beverages.",
  },
  {
    question: "Are vegetarian and non-vegetarian dishes available?",
    answer:
      "Yes. The public menu lists substantial vegetarian and non-vegetarian sections, including paneer, kebabs, curries, breads and biryanis.",
  },
  {
    question: "Can I see the latest menu and prices?",
    answer:
      "Use the live Zomato menu linked throughout this website. Prices and availability can change, and some guest-mentioned dishes may be dine-in specials rather than delivery items.",
  },
  {
    question: "Does the restaurant have a fort view or parking?",
    answer:
      "Public guest reviews mention a terrace view toward Jaisalmer Fort. Tripadvisor reports parking options, but guests should call ahead to confirm access and current arrangements.",
  },
  {
    question: "What about allergies or specialist diets?",
    answer:
      "Jain, vegan, gluten-free and allergen-separation guarantees are not verified in current first-party information. Speak directly with the restaurant before ordering so the kitchen can advise safely.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "an-evening-near-jaisalmer-fort",
    category: "Golden City",
    title: "An evening within walking distance of Jaisalmer Fort",
    dek: "Four nearby landmarks and a practical way to shape the hours before dinner.",
    checkedAt: "July 29, 2026",
    readTime: "4 min read",
    sourceIds: ["google", "rajasthan-tourism"],
    paragraphs: [
      "Zayit sits on Fort Parking Road, roughly 0.30 kilometres from Jaisalmer Fort by public map routes. The Jain Temples are closer still, while Patwon Ki Haveli and Gadisar Lake can extend the walk into a longer city circuit.",
      "Distances on this website are deliberately approximate. Old-city routes, entrance points, weather and traffic can change the shape of a walk, so each landmark links to live directions rather than a fixed itinerary.",
      "For an unhurried evening, visit the fort precinct before sunset, allow time for the lanes, then call the restaurant to confirm the day’s opening hour and your table.",
    ],
  },
  {
    slug: "reading-the-public-zayit-menu",
    category: "At the table",
    title: "Reading Zayit’s public menu",
    dek: "A source-backed guide to the tandoor, handi, breads, biryani and café chapters.",
    checkedAt: "July 29, 2026",
    readTime: "5 min read",
    sourceIds: ["zomato", "instagram"],
    paragraphs: [
      "The current public delivery menu is broad: soups and salads, vegetarian and non-vegetarian starters, more than fifty main-course listings, breads, rice and biryani, noodles, sandwiches, snacks, Kathi rolls, desserts and beverages.",
      "The strongest through-line is the Indian kitchen—paneer and chicken from the tandoor, lentils and curries from the handi, and a substantial bread-and-rice section. Zayit’s official Instagram also describes an Indian and Mediterranean identity.",
      "This journal does not reproduce prices because the public ordering platform is the changing source of truth. Use the live menu for current availability, and call for dine-in specials or dietary questions.",
    ],
  },
  {
    slug: "planning-a-visit-to-zayit",
    category: "Practical notes",
    title: "Planning a visit to Zayit",
    dek: "The address, current public hours and reservation route in one clear note.",
    checkedAt: "July 29, 2026",
    readTime: "3 min read",
    sourceIds: ["google", "instagram"],
    paragraphs: [
      "The restaurant is on the first floor above the Jaisalmer Art Museum, Fort Parking Road, Dhibba Para. The verified primary telephone number is +91 70730 96695.",
      "Current official Instagram information states daily service from 11:00 AM until 12:30 AM. Google may show an earlier 9:30 AM opening, so the most reliable same-day step is to call.",
      "Reservations are publicly listed as accepted. This website can open a pre-filled WhatsApp request to the public telephone number or prepare an email, but neither channel is a confirmed booking until the restaurant responds. A telephone call remains the clearest verified route.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSource(id: string) {
  return sources.find((source) => source.id === id);
}
