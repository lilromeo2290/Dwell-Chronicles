import type { Metadata } from 'next';

const propertyData: Record<string, { title: string; description: string; img: string }> = {
  '1': {
    title: 'Sage Manor Estate - 5 Bedroom Detached House for Sale',
    description: 'A magnificent 5-bedroom detached house featuring spacious living areas, modern kitchen, swimming pool, garden, and smart home technology. Listed by Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  },
  '2': {
    title: 'The Skyline Penthouse - 4 Bedroom Luxury Penthouse',
    description: 'Stunning 4-bedroom penthouse with panoramic city views, rooftop terrace, concierge service, and premium finishes. Available through Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  },
  '3': {
    title: 'Greenfield Villa - 6 Bedroom Estate with Pool',
    description: 'Spacious 6-bedroom villa set in lush greenery with a private pool, home office, and modern amenities. Find more properties on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  },
  '4': {
    title: 'Harbour View Apartments - 3 Bedroom Sea View Apartment',
    description: 'Beautiful 3-bedroom apartment with stunning harbour views, modern finishes, and access to communal amenities. Listed on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  },
  '5': {
    title: 'Savanna Lodge - 3 Bedroom Family Home',
    description: 'Charming 3-bedroom family home with a private garden, modern kitchen, and spacious living areas. Browse more homes on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
  },
  '6': {
    title: 'Coastal Breeze Residence - 4 Bedroom Beach House',
    description: 'Stunning 4-bedroom beach house with ocean views, private beach access, and luxury outdoor living space. Available on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
  },
  '7': {
    title: 'Akan Heights Estate - 5 Bedroom Hilltop Property',
    description: 'Impressive 5-bedroom hilltop estate with panoramic views, infinity pool, and luxury finishes. Property listing by Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80',
  },
  '8': {
    title: 'The Oasis Condo - 2 Bedroom Luxury Condo',
    description: 'Modern 2-bedroom luxury condo with resort-style amenities including pool, gym, and 24/7 security. Listed on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
  },
  '9': {
    title: 'Royal Palm Mansion - 7 Bedroom Luxury Mansion',
    description: 'Grand 7-bedroom luxury mansion with extensive grounds, home cinema, wine cellar, and staff quarters. Available through Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
  },
  '10': {
    title: 'Sunset Ridge Townhouse - 3 Bedroom Townhouse',
    description: 'Elegant 3-bedroom townhouse in a gated community with mountain views, modern design, and private parking. Browse on Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
  },
  '11': {
    title: 'Lakeside Modern Villa - 4 Bedroom Lakeside Property',
    description: 'Contemporary 4-bedroom villa with lakefront location, private dock, outdoor entertainment area, and smart home features. Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80',
  },
  '12': {
    title: 'The Horizon Tower - 3 Bedroom High-Rise Apartment',
    description: 'Premium 3-bedroom high-rise apartment with city skyline views, modern interiors, concierge, and premium building amenities. Dwell Chronicles Ghana.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const prop = propertyData[id];
  const defaultTitle = 'Property Details | Dwell Chronicles Ghana';
  const defaultDesc = 'View this property listing on Dwell Chronicles Ghana - the leading property listing website in Ghana.';

  return {
    title: prop ? prop.title : defaultTitle,
    description: prop ? prop.description : defaultDesc,
    alternates: {
      canonical: 'https://dwellchroniclesgh.com/property/' + id,
    },
    openGraph: {
      title: prop ? prop.title : defaultTitle,
      description: prop ? prop.description : defaultDesc,
      url: 'https://dwellchroniclesgh.com/property/' + id,
      images: prop ? [{ url: prop.img, width: 1200, height: 630, alt: prop.title }] : [],
    },
  };
}

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
