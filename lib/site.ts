export const siteConfig = {
  name: "Zayit India Fine Dine",
  legalName: "Zayit India Fine Dine - Best Restaurant In Jaisalmer",
  description:
    "Indian and Mediterranean dining near Jaisalmer Fort, with verified hours, menu, ratings, directions and reservation contact.",
  url: "https://zayit-india-jaisalmer.hello-tchopra.chatgpt.site",
  phoneDisplay: "+91 70730 96695",
  phoneHref: "tel:+917073096695",
  whatsapp:
    "https://wa.me/917073096695?text=Namaste%20Zayit%20India%20Fine%20Dine.%20I%20would%20like%20to%20request%20a%20table.%20Please%20confirm%20the%20date%2C%20time%20and%20guest%20count%20with%20me.",
  email: "zayitindia@gmail.com",
  instagram: "https://www.instagram.com/zayitindiafinedine/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Zayit%20India%20Fine%20Dine&query_place_id=ChIJlUCdHga9RzkRNreeXzLDyU8",
  mapEmbed:
    "https://www.google.com/maps?q=26.9115606,70.9130601&z=17&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Zayit%20India%20Fine%20Dine%2C%20Jaisalmer&destination_place_id=ChIJlUCdHga9RzkRNreeXzLDyU8",
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
    | "/blog"
    | "/guide";
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

export const footerNavigation: NavigationItem[] = [
  ...navigation,
  { href: "/guide", label: "Jaisalmer guide" },
];
