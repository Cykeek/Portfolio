import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cykeek | Design Engineering for Global Brands",
  description: "Senior Web & Product Designer Portfolio. Bridging the gap between complex engineering and design to build products that people actually love using.",
  openGraph: {
    title: "Cykeek | Design Engineering for Global Brands",
    description: "Senior Web & Product Designer Portfolio. Building products that people actually love using.",
    url: "https://cykeek.com",
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
    title: "Cykeek | Design Engineering for Global Brands",
    description: "Senior Web & Product Designer Portfolio",
    images: ["/og-image.svg"],
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
