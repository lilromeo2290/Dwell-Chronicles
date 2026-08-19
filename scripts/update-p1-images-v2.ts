import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const NEW_IMAGES = [
  {
    url: '/uploads/property1/p1-living-kitchen.jpg',
    alt: 'Modern living room and kitchen - Youth Resources Center, Adaklu Road, Ho',
  },
  {
    url: '/uploads/property1/p1-bedroom.jpg',
    alt: 'Comfortable bedroom - Youth Resources Center, Adaklu Road, Ho',
  },
  {
    url: '/uploads/property1/p1-stairwell.jpg',
    alt: 'Interior stairwell - Youth Resources Center, Adaklu Road, Ho',
  },
];

async function updateProperty1Images() {
  // Get all Property 1 apartments
  const apartments = await db.apartment.findMany({
    where: { area: { contains: 'Adaklu' } },
    select: { id: true, code: true, name: true },
  });

  console.log('Found ' + apartments.length + ' Property 1 apartments');

  for (const apt of apartments) {
    // Delete all existing images
    const deleted = await db.apartmentImage.deleteMany({
      where: { apartmentId: apt.id },
    });
    console.log('  ' + apt.code + ': deleted ' + deleted.count + ' old images');

    // Insert new images
    for (let i = 0; i < NEW_IMAGES.length; i++) {
      await db.apartmentImage.create({
        data: {
          apartmentId: apt.id,
          url: NEW_IMAGES[i].url,
          alt: NEW_IMAGES[i].alt + ' - ' + apt.name,
          sortOrder: i,
        },
      });
    }
    console.log('  ' + apt.code + ': added ' + NEW_IMAGES.length + ' new images');
  }

  // Verify
  const total = await db.apartmentImage.count({
    where: { apartment: { area: { contains: 'Adaklu' } } },
  });
  console.log('Total Property 1 images in DB: ' + total);
}

updateProperty1Images()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
