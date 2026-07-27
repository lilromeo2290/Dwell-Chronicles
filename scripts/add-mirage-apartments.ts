import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const amenities = JSON.stringify([
    'Spacious Rooms',
    'Wardrobe',
    'Gated Compound with CCTV & Electric Fence',
    'Hot Water Shower',
    'Smart TV with Netflix & DSTV',
    'High-Speed Unlimited WiFi',
    'Ample Parking Space',
    'Terrace',
    'Visitor\'s Washroom',
    'Fitted Kitchen with All Appliances & Washing Machine',
    'Dining Area',
    'Standby Generator',
    'Security at Post',
    'Housekeeping'
  ]);

  const description = `Why settle for traditional accommodation when you can have the whole place to yourself?

Our luxury Airbnb offers the privacy, space, and comfort you deserve. Enjoy a fully furnished home, cook your own meals, and relax in a serene environment — perfect for families, friends, or solo travellers looking for a more personal experience.

Located a minute drive from Mirage, Ho. Features include spacious rooms, wardrobe, gated compound with CCTV and electric fence, hot water shower, smart TVs with Netflix and DSTV, high-speed unlimited WiFi, ample parking space, terrace, visitor's washroom, fitted kitchen with all appliances and washing machine, dining area, standby generator, security at post, and housekeeping.`;

  const images = [
    '/uploads/apartments/ho-luxury-mirage-1.jpg',
    '/uploads/apartments/ho-luxury-mirage-2.jpg',
    '/uploads/apartments/ho-luxury-mirage-3.jpg',
    '/uploads/apartments/ho-luxury-mirage-4.jpg',
  ];

  // Generate 90 days of availability starting from today
  const availabilityDates: { apartmentId: string; date: string; status: string }[][] = [[], []];
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    availabilityDates[0].push({ apartmentId: '', date: dateStr, status: 'available' });
    availabilityDates[1].push({ apartmentId: '', date: dateStr, status: 'available' });
  }

  // Create 2 Bedroom Apartment
  const apt2br = await db.apartment.create({
    data: {
      name: 'Luxury Furnished 2 Bedroom Apartment',
      code: 'HO-MIRAGE-2BR',
      description,
      address: 'Near Mirage, Ho',
      city: 'Ho',
      area: 'Mirage',
      pricePerNight: 1400,
      weeklyPrice: 9100,
      monthlyPrice: 35000,
      cleaningFee: 100,
      securityDeposit: 2000,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 6,
      rating: 5.0,
      status: 'available',
      category: 'luxury',
      featured: true,
      newlyAdded: true,
      amenities,
      whatsappNumber: '233547293193',
      images: {
        create: images.map((url, idx) => ({
          url,
          alt: `Luxury 2 Bedroom Apartment near Mirage, Ho - Photo ${idx + 1}`,
          sortOrder: idx,
        })),
      },
      availabilityDates: {
        create: availabilityDates[0].map((d) => ({
          date: d.date,
          status: d.status,
        })),
      },
    },
  });

  // Create 3 Bedroom Apartment
  const apt3br = await db.apartment.create({
    data: {
      name: 'Luxury Furnished 3 Bedroom Apartment',
      code: 'HO-MIRAGE-3BR',
      description,
      address: 'Near Mirage, Ho',
      city: 'Ho',
      area: 'Mirage',
      pricePerNight: 1800,
      weeklyPrice: 11700,
      monthlyPrice: 45000,
      cleaningFee: 150,
      securityDeposit: 3000,
      bedrooms: 3,
      bathrooms: 3,
      maxGuests: 8,
      rating: 5.0,
      status: 'available',
      category: 'luxury',
      featured: true,
      newlyAdded: true,
      amenities,
      whatsappNumber: '233547293193',
      images: {
        create: images.map((url, idx) => ({
          url,
          alt: `Luxury 3 Bedroom Apartment near Mirage, Ho - Photo ${idx + 1}`,
          sortOrder: idx,
        })),
      },
      availabilityDates: {
        create: availabilityDates[1].map((d) => ({
          date: d.date,
          status: d.status,
        })),
      },
    },
  });

  console.log('✅ Created 2BR apartment:', apt2br.id, apt2br.code);
  console.log('✅ Created 3BR apartment:', apt3br.id, apt3br.code);
  console.log(`✅ Generated 90 availability days for each apartment`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
