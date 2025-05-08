
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GamerCo 2025 | Convención de Videojuegos",
  description:
    "Únete a GamerCo 2025 el 20 de junio en el Centro de Convenciones WTC. Exhibiciones exclusivas, torneos emocionantes, lanzamientos de juegos y mucho más.",
  keywords: [
    "GamerCo", 
    "videojuegos", 
    "convención gamers", 
    "evento gaming 2025", 
    "WTC CDMX"
  ],
  authors: [{ name: "GamerCo Org.", url: "https://landing-page-two-beta-20.vercel.app" }],
  openGraph: {
    title: "GamerCo 2025 | Convención de Videojuegos",
    description:
      "No te pierdas GamerCo 2025: la convención gaming más grande del año en el WTC, CDMX.",
    url: "https://landing-page-two-beta-20.vercel.app",
    siteName: "GamerCo",
    images: [
      {
        url: "https://landing-page-two-beta-20.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Banner GamerCo 2025",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamerCo 2025 | Convención de Videojuegos",
    description:
      "Vive GamerCo 2025 el 20 de junio en el WTC CDMX: torneos, lanzamientos y más.",
    creator: "@GamerCoOFICIAL",
    images: ["https://landing-page-two-beta-20.vercel.app/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
