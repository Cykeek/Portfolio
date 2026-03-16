import type { Metadata } from "next";
import PricingPage from "./page";

export const metadata: Metadata = {
  title: "Pricing | Transparent Design Engineering Rates",
  description: "Transparent pricing for design engineering services. Fixed-price packages for web design, UI/UX, and product development. Available for new projects.",
  openGraph: {
    title: "Pricing | Transparent Design Engineering Rates",
    description: "Transparent pricing for design engineering services. Fixed-price packages for web design, UI/UX, and product development.",
    url: "https://cykeek.com/pricing",
    images: [
      {
        url: "/og-image-pricing.svg",
        width: 1200,
        height: 630,
        alt: "Cykeek - Pricing",
      },
    ],
  },
  twitter: {
    title: "Pricing | Transparent Design Engineering Rates",
    description: "Transparent pricing for design engineering services",
    images: ["https://cykeek.com/og-image-pricing.svg"],
  },
};

export default function PricingLayout() {
  return <PricingPage />;
}
