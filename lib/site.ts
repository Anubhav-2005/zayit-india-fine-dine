export const siteConfig = {
  name: "Zayit India Fine Dine",
  legalName: "Zayit India Fine Dine - Best Restaurant In Jaisalmer",
  description:
    "Indian and Mediterranean dining near Jaisalmer Fort, with verified hours, menu, ratings, directions and reservation contact.",
  url: "https://zayit-india-jaisalmer.hello-tchopra.chatgpt.site",
  phoneDisplay: "+91 70730 96695",
  phoneHref: "tel:+917073096695",
  email: "zayitindia@gmail.com",
  instagram: "https://www.instagram.com/zayitindiafinedine/",
  maps: "https://www.google.com/maps?cid=5749341020435167030",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=26.9115606%2C70.9130601",
  menu:
    "https://www.zomato.com/jaisalmer/zayit-india-fine-dine-amar-sagar-pol/order",
  tripadvisor:
    "https://www.tripadvisor.in/Restaurant_Review-g297667-d27171541-Reviews-Zayit_India_Fine_Dine-Jaisalmer_Jaisalmer_District_Rajasthan.html",
  address: {
    line1: "First Floor, above Jaisalmer Art Museum",
    line2: "Fort Parking Road, Dhibba Para",
    city: "Jaisalmer",
    region: "Rajasthan",
    postalCode: "345001",
    country: "India",
    plusCode: "WW67+J6",
    latitude: 26.9115606,
    longitude: 70.9130601,
  },
  hours: {
    display: "Daily · 11:00 AM–12:30 AM",
    compact: "11 AM–12:30 AM",
    disclosure:
      "Official Instagram states 11:00 AM–12:30 AM daily. Google may show a 9:30 AM opening; call for today’s hours.",
  },
} as const;

export type NavigationItem = {
  href:
    | "/"
    | "/menu"
    | "/about"
    | "/gallery"
    | "/reservations"
    | "/events"
    | "/private-dining"
    | "/contact"
    | "/blog";
  label: string;
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/events", label: "Events" },
  { href: "/private-dining", label: "Private dining" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Journal" },
];
