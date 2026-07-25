import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dwell Chronicles Ghana | Property Listings, Land Sales, Rentals & Construction Services",
  description:
    "Find your dream property and build your future with Dwell Chronicles. Premium property listings, land sales, short-stay rentals, construction solutions & investment opportunities in Ghana.",
  keywords: [
    "Dwell Chronicles",
    "property listings Ghana",
    "real estate Ghana",
    "land for sale Ghana",
    "rentals Ghana",
    "Airbnb Ghana",
    "short stay Ho",
    "construction services",
    "luxury homes Ghana",
    "commercial buildings",
    "investment properties",
    "property development",
  ],
  authors: [{ name: "Dwell Chronicles" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Dwell Chronicles Ghana | Property Listings, Land Sales, Rentals & Construction Services",
    description:
      "Find your dream property and build your future with Dwell Chronicles. Premium property listings, land sales, short-stay rentals, construction solutions & investment opportunities in Ghana.",
    siteName: "Dwell Chronicles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwell Chronicles Ghana | Property Listings, Land Sales, Rentals & Construction Services",
    description:
      "Property Listings, Land Sales, Rentals & Construction Services in Ghana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
