import type { Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Packshot.art - Directions Artistiques Premium pour Packshots",
  description: "Transformez vos packshots avec nos 311 directions artistiques professionnelles. E-commerce, Premium et Editorial. Créez des visuels qui convertissent.",
  keywords: ["packshot", "direction artistique", "retouche photo", "e-commerce", "photographie produit"],
  authors: [{ name: "Packshot.art" }],
  openGraph: {
    title: "Packshot.art - Directions Artistiques Premium",
    description: "311 directions artistiques professionnelles pour transformer vos packshots produits",
    url: "https://packshot.art",
    siteName: "Packshot.art",
    images: [
      {
        url: "https://packshot.art/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Packshot.art - Directions Artistiques Premium",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packshot.art - Directions Artistiques Premium",
    description: "311 directions artistiques professionnelles pour transformer vos packshots produits",
    images: ["https://packshot.art/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${crimsonText.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
