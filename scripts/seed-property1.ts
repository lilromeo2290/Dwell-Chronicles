import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const property1Apartments = [
  {
    name: 'Executive 2-Bedroom Apartment',
    code: 'HO-YRC-2BR',
    description: 'Spacious executive 2-bedroom apartment opposite the New Youth Resources Center on Adaklu Road, Ho. Features modern furnishings, fully equipped kitchen, high-speed Starlink internet, Smart TV, and 24/7 security. Perfect for families or business travelers seeking comfort and convenience in the Volta Region.',
    address: 'Opposite New Youth Resources Center, Adaklu Road, Ho',
    city: 'Ho',
    area: 'Adaklu Road',
    pricePerNight: 1500,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 5.0,
    status: 'available',
    category: 'executive',
    featured: true,
    newlyAdded: false,
    amenities: JSON.stringify(['Starlink Internet', 'Smart TV', 'Air Conditioning', 'Fully Equipped Kitchen', 'Refrigerator', 'Microwave', 'Hot Water', 'Parking', 'Security', 'Workspace', 'Breakfast Included']),
    whatsappNumber: '233204700023',
    images: [
      { url: '/room-living.jpg', alt: 'Spacious living room with modern furnishings - Dwell Chronicles Ho', sortOrder: 0 },
      { url: '/room-bedroom.jpg', alt: 'Master bedroom with comfortable bed - Dwell Chronicles Ho', sortOrder: 1 },
      { url: '/room-kitchen.jpg', alt: 'Fully equipped kitchen - Dwell Chronicles Ho', sortOrder: 2 },
      { url: '/room-hallway.jpg', alt: 'Interior hallway - Dwell Chronicles Ho', sortOrder: 3 },
      { url: '/room-exterior.jpg', alt: 'Building exterior view - Dwell Chronicles Ho', sortOrder: 4 },
      { url: '/room-living2.jpg', alt: 'Second living area - Dwell Chronicles Ho', sortOrder: 5 },
      { url: '/room-staircase.jpg', alt: 'Staircase and landing - Dwell Chronicles Ho', sortOrder: 6 },
    ],
  },
  {
    name: 'Luxury 1-Bedroom Executive Suite',
    code: 'HO-YRC-EXEC',
    description: 'Premium executive suite with separate living area and bedroom. Features luxury furnishings, dedicated workspace, premium bathroom, and stunning views. Ideal for executives and couples seeking a refined stay experience on Adaklu Road, Ho.',
    address: 'Opposite New Youth Resources Center, Adaklu Road, Ho',
    city: 'Ho',
    area: 'Adaklu Road',
    pricePerNight: 1000,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 5.0,
    status: 'available',
    category: 'luxury',
    featured: true,
    newlyAdded: false,
    amenities: JSON.stringify(['Starlink Internet', 'Smart TV', 'Air Conditioning', 'Kitchenette', 'Refrigerator', 'Hot Water', 'Parking', 'Security', 'Workspace', 'Breakfast Included']),
    whatsappNumber: '233204700023',
    images: [
      { url: '/room-living.jpg', alt: 'Executive living area - Dwell Chronicles Ho', sortOrder: 0 },
      { url: '/room-bedroom.jpg', alt: 'Executive bedroom - Dwell Chronicles Ho', sortOrder: 1 },
      { url: '/room-kitchen.jpg', alt: 'Kitchenette - Dwell Chronicles Ho', sortOrder: 2 },
      { url: '/room-exterior.jpg', alt: 'Property exterior - Dwell Chronicles Ho', sortOrder: 3 },
      { url: '/room-living2.jpg', alt: 'Lounge area - Dwell Chronicles Ho', sortOrder: 4 },
    ],
  },
  {
    name: 'Deluxe 1-Bedroom Suite',
    code: 'HO-YRC-DEL',
    description: 'Beautifully appointed deluxe suite offering premium comfort at an accessible price. Features modern decor, comfortable bedding, en-suite bathroom, and all essential amenities. Located on Adaklu Road, Ho with easy access to city center.',
    address: 'Opposite New Youth Resources Center, Adaklu Road, Ho',
    city: 'Ho',
    area: 'Adaklu Road',
    pricePerNight: 750,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.8,
    status: 'available',
    category: 'deluxe',
    featured: false,
    newlyAdded: true,
    amenities: JSON.stringify(['Starlink Internet', 'Smart TV', 'Air Conditioning', 'Kitchenette', 'Hot Water', 'Parking', 'Security', 'Breakfast Included']),
    whatsappNumber: '233204700023',
    images: [
      { url: '/room-bedroom.jpg', alt: 'Deluxe bedroom - Dwell Chronicles Ho', sortOrder: 0 },
      { url: '/room-living.jpg', alt: 'Deluxe living area - Dwell Chronicles Ho', sortOrder: 1 },
      { url: '/room-kitchen.jpg', alt: 'Kitchenette - Dwell Chronicles Ho', sortOrder: 2 },
      { url: '/room-hallway.jpg', alt: 'Hallway - Dwell Chronicles Ho', sortOrder: 3 },
    ],
  },
  {
    name: 'Superior 1-Bedroom Room',
    code: 'HO-YRC-SUP',
    description: 'Well-furnished superior room offering great value for money. Features comfortable queen-size bed, clean en-suite bathroom, work desk, and reliable Starlink internet. Perfect for solo travelers and business visitors to Ho, Volta Region.',
    address: 'Opposite New Youth Resources Center, Adaklu Road, Ho',
    city: 'Ho',
    area: 'Adaklu Road',
    pricePerNight: 600,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.7,
    status: 'available',
    category: 'superior',
    featured: false,
    newlyAdded: true,
    amenities: JSON.stringify(['Starlink Internet', 'Smart TV', 'Air Conditioning', 'Hot Water', 'Parking', 'Security', 'Breakfast Included']),
    whatsappNumber: '233204700023',
    images: [
      { url: '/room-bedroom.jpg', alt: 'Superior room bedroom - Dwell Chronicles Ho', sortOrder: 0 },
      { url: '/room-living.jpg', alt: 'Superior room sitting area - Dwell Chronicles Ho', sortOrder: 1 },
      { url: '/room-hallway.jpg', alt: 'Room entrance - Dwell Chronicles Ho', sortOrder: 2 },
    ],
  },
  {
    name: 'Standard 1-Bedroom Room',
    code: 'HO-YRC-STD',
    description: 'Clean and comfortable standard room ideal for budget-conscious travelers. Features comfortable bedding, private bathroom, Wi-Fi, and access to all shared facilities. Great for short stays and transit visitors exploring Ho and the Volta Region.',
    address: 'Opposite New Youth Resources Center, Adaklu Road, Ho',
    city: 'Ho',
    area: 'Adaklu Road',
    pricePerNight: 500,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.5,
    status: 'available',
    category: 'standard',
    featured: false,
    newlyAdded: true,
    amenities: JSON.stringify(['Starlink Internet', 'Smart TV', 'Air Conditioning', 'Hot Water', 'Parking', 'Security', 'Breakfast Included']),
    whatsappNumber: '233204700023',
    images: [
      { url: '/room-bedroom.jpg', alt: 'Standard room - Dwell Chronicles Ho', sortOrder: 0 },
      { url: '/room-hallway.jpg', alt: 'Standard room entrance - Dwell Chronicles Ho', sortOrder: 1 },
      { url: '/room-exterior.jpg', alt: 'Building view - Dwell Chronicles Ho', sortOrder: 2 },
    ],
  },
];

async function seedProperty1() {
  console.log('Seeding Property 1 apartments (Adaklu Road, Ho)...');

  for (const apt of property1Apartments) {
    const { images, ...aptData } = apt;

    // Upsert: create if not exists, skip if already exists
    const existing = await db.apartment.findUnique({ where: { code: aptData.code } });
    if (existing) {
      console.log('  Skipping ' + aptData.code + ' (already exists)');
      continue;
    }

    const apartment = await db.apartment.create({ data: aptData });

    for (const img of images) {
      await db.apartmentImage.create({
        data: {
          apartmentId: apartment.id,
          url: img.url,
          alt: img.alt,
          sortOrder: img.sortOrder,
        },
      });
    }

    // Generate 90 days of availability
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dateNum = d.getDate();
      let status = 'available';
      if (dateNum % 7 === 0) status = 'booked';
      else if (dateNum % 11 === 0) status = 'reserved';

      await db.apartmentAvailability.create({
        data: { apartmentId: apartment.id, date: dateStr, status },
      });
    }

    console.log('  Created ' + aptData.code + ' - ' + aptData.name);
  }

  // Verify
  const count = await db.apartment.count({ where: { area: { contains: 'Adaklu' } } });
  console.log('Done! Property 1 apartments in DB: ' + count);
}

seedProperty1()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
