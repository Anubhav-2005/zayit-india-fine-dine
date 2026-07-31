import { siteConfig } from "@/lib/site";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.legalName,
    telephone: "+91-70730-96695",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    servesCuisine: [
      "Indian",
      "Mediterranean",
      "North Indian",
      "Chinese",
      "Biryani",
    ],
    priceRange: "₹₹–₹₹₹",
    openingHours: "Mo-Su 11:00-00:30",
    acceptsReservations: true,
    hasMenu: siteConfig.menu,
    sameAs: [
      siteConfig.instagram,
      siteConfig.maps,
      siteConfig.tripadvisor,
    ],
  };
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
