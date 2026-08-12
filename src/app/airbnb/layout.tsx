import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb Short-Stay Rentals in Ghana | Executive Apartments & Rooms',
  description:
    'Book executive short-stay apartments and Airbnb rentals in Ghana. Studio, 1-bedroom, 2-bedroom, and 3-bedroom apartments in Ho, Accra, and across Ghana with WiFi, AC, and premium amenities.',
  alternates: {
    canonical: 'https://dwellchroniclesgh.com/airbnb',
  },
  openGraph: {
    title: 'Airbnb Short-Stay Rentals in Ghana | Executive Apartments',
    description:
      'Book premium short-stay apartments in Ho and across Ghana. Verified properties with WiFi, AC, kitchen, and housekeeping.',
    url: 'https://dwellchroniclesgh.com/airbnb',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Short-Stay Rentals in Ghana - Dwell Chronicles',
      },
    ],
  },
};

export default function AirbnbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
