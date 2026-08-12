import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://dwellchroniclesgh.com"),
  title: {
    default: "Dwell Chronicles Ghana | #1 Property Listing Website in Ghana",
    template: "%s | Dwell Chronicles Ghana",
  },
  description:
    "Dwell Chronicles Ghana is the leading property listing website in Ghana. Browse verified houses, apartments, lands for sale, short-stay Airbnb rentals, and construction services across Accra, Ho, Kumasi, and all regions.",
  keywords: [
    "property listing websites Ghana",
    "property listings Ghana",
    "real estate Ghana",
    "houses for sale Ghana",
    "apartments for rent Ghana",
    "land for sale Ghana",
    "Airbnb Ghana",
    "short stay Ho",
    "construction services Ghana",
    "luxury homes Ghana",
    "commercial buildings Ghana",
    "investment properties Ghana",
    "property development Ghana",
    "Dwell Chronicles",
    "buy land in Ghana",
    "rent apartment Accra",
    "property management Ghana",
  ],
  authors: [{ name: "Dwell Chronicles" }],
  creator: "Dwell Chronicles",
  publisher: "Dwell Chronicles",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Dwell Chronicles Ghana | #1 Property Listing Website in Ghana",
    description:
      "Browse verified houses, apartments, lands for sale, short-stay Airbnb rentals, and construction services across Accra, Ho, Kumasi, and all regions of Ghana.",
    siteName: "Dwell Chronicles",
    type: "website",
    locale: "en_GH",
    url: "https://dwellchroniclesgh.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1152,
        height: 864,
        alt: "Dwell Chronicles Ghana - Property Listings and Real Estate Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwell Chronicles Ghana | #1 Property Listing Website in Ghana",
    description:
      "Browse verified houses, apartments, lands for sale, short-stay rentals, and construction services in Ghana.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dwellchroniclesgh.com",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
