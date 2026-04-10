import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GridOverlay from "@/components/layout/GridOverlay";
import GlobalBackground from "@/components/layout/GlobalBackground";
import PageTransition from "@/components/layout/PageTransition";
import CookieConsent from "@/components/layout/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cykeek | Design Engineering for Global Brands",
    template: "%s | Cykeek",
  },
  description: "Senior Web & Product Designer Portfolio. Bridging the gap between complex engineering and design to build products that people actually love using.",
  keywords: ["product designer", "web designer", "UI/UX designer", "design engineer", "portfolio"],
  authors: [{ name: "Soumajit Das" }],
  creator: "Cykeek",
  metadataBase: new URL("https://cykeek.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cykeek.com",
    siteName: "Cykeek",
    title: "Cykeek | Design Engineering for Global Brands",
    description: "Senior Web & Product Designer Portfolio. Building products that people actually love using.",
        images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Cykeek - Design Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cykeek | Design Engineering for Global Brands",
    description: "Senior Web & Product Designer Portfolio",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soumajit Das",
  alternateName: "Cykeek",
  url: "https://cykeek.com",
  jobTitle: "Senior Web & Product Designer",
  description: "Product Designer bridging complex engineering and design to build products that people actually love using.",
  sameAs: [
    "https://twitter.com/cykeek",
    "https://linkedin.com/in/cykeek",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Studio 1947",
  },
  knowsAbout: ["UI/UX Design", "Web Development", "Product Design", "Design Engineering"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalBackground />
        <GridOverlay />
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
        <CookieConsent />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
