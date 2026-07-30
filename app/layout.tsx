import type { Metadata, Viewport } from "next";

import "./globals.css";

import {
  FloatingActionDock,
  NavigationTransition,
} from "@/components/experience";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CinematicEffects } from "@/components/motion/cinematic-effects";
import { RestaurantJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Zayit India Fine Dine | Jaisalmer",
    template: "%s | Zayit India Fine Dine",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Zayit India Fine Dine",
    "restaurant in Jaisalmer",
    "Jaisalmer Fort restaurant",
    "Indian restaurant Jaisalmer",
    "Mediterranean restaurant Jaisalmer",
  ],
  icons: {
    icon: "/images/zayit-favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: "Zayit India Fine Dine | Jaisalmer",
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Zayit India Fine Dine | Jaisalmer",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <RestaurantJsonLd />
        <SiteHeader />
        <CinematicEffects />
        {children}
        <SiteFooter />
        <FloatingActionDock
          phoneHref={siteConfig.phoneHref}
          whatsappHref={siteConfig.whatsapp}
        />
        <NavigationTransition />
        <div className="site-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
