import type { Metadata } from 'next';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import WhatsAppChat from '@/components/sections/WhatsAppChat';
import PropertiesStructuredData from '@/components/seo/PropertiesStructuredData';

export const metadata: Metadata = {
  title: 'Property Listings in Ghana | Houses, Apartments & Lands for Sale',
  description:
    'Browse the best property listings in Ghana. Find verified houses for sale, apartments for rent, lands for sale, and commercial properties across Accra, Ho, Kumasi, Tamale, and all regions. Dwell Chronicles is Ghana\'s leading property listing website.',
  alternates: {
    canonical: 'https://dwellchroniclesgh.com/properties',
  },
  openGraph: {
    title: 'Property Listings in Ghana | Houses, Apartments & Lands for Sale',
    description:
      'Browse verified property listings in Ghana. Houses, apartments, lands, and commercial properties across all regions.',
    url: 'https://dwellchroniclesgh.com/properties',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Property Listings in Ghana - Dwell Chronicles',
      },
    ],
  },
};

export default function PropertiesPage() {
  return (
    <>
      <PropertiesStructuredData />
      <Navigation />
      <main>
        <div id="properties">
          <FeaturedProperties />
        </div>
      </main>
      <Footer />
      <WhatsAppChat />
    </>
  );
}
