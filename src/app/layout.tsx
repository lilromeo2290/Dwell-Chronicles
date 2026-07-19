import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dwell Chronicles — Premium Property Listings & Construction Solutions",
  description:
    "Find your dream property and build your future with Dwell Chronicles. Premium property listings, construction solutions, real estate insights & investment opportunities.",
  keywords: [
    "Dwell Chronicles",
    "property listings",
    "real estate",
    "construction",
    "luxury homes",
    "commercial buildings",
    "investment properties",
    "architectural design",
    "property development",
  ],
  authors: [{ name: "Dwell Chronicles" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Dwell Chronicles — Premium Property Listings & Construction Solutions",
    description:
      "Find your dream property and build your future with Dwell Chronicles. Premium property listings, construction solutions, real estate insights & investment opportunities.",
    siteName: "Dwell Chronicles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwell Chronicles",
    description:
      "Premium Property Listings & Construction Solutions",
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