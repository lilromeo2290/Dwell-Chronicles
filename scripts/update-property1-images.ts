import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// New Property 1 images - completely different from Property 2
const property1Images: Record<string, { url: string; alt: string; sortOrder: number }[]> = {
  'HO-YRC-2BR': [
    { url: '/uploads/property1/p1-exec-living.jpg', alt: 'Spacious living area - Youth Resources Center, Ho', sortOrder: 0 },
    { url: '/uploads/property1/p1-exec-bedroom.jpg', alt: 'Master bedroom with comfortable bedding - Youth Resources Center, Ho', sortOrder: 1 },
    { url: '/uploads/property1/p1-exec-kitchen.jpg', alt: 'Fully equipped kitchen - Youth Resources Center, Ho', sortOrder: 2 },
    { url: '/uploads/property1/p1-bathroom.jpg', alt: 'Modern bathroom with shower - Youth Resources Center, Ho', sortOrder: 3 },
    { url: '/uploads/property1/p1-exterior.jpg', alt: 'Building exterior - Youth Resources Center, Ho', sortOrder: 4 },
    { url: '/uploads/property1/p1-business-room.jpg', alt: 'Second bedroom - Youth Resources Center, Ho', sortOrder: 5 },
    { url: '/uploads/property1/p1-dining.jpg', alt: 'Dining area - Youth Resources Center, Ho', sortOrder: 6 },
  ],
  'HO-YRC-EXEC': [
    { url: '/uploads/property1/p1-luxury-suite.jpg', alt: 'Executive suite living area - Youth Resources Center, Ho', sortOrder: 0 },
    { url: '/uploads/property1/p1-exec-bedroom.jpg', alt: 'Executive bedroom - Youth Resources Center, Ho', sortOrder: 1 },
    { url: '/uploads/property1/p1-exec-kitchen.jpg', alt: 'Kitchen area - Youth Resources Center, Ho', sortOrder: 2 },
    { url: '/uploads/property1/p1-hotel-ext.jpg', alt: 'Property exterior view - Youth Resources Center, Ho', sortOrder: 3 },
    { url: '/uploads/property1/p1-luxury-bath.jpg', alt: 'Luxury bathroom - Youth Resources Center, Ho', sortOrder: 4 },
  ],
  'HO-YRC-DEL': [
    { url: '/uploads/property1/p1-deluxe-bed.jpg', alt: 'Deluxe bedroom - Youth Resources Center, Ho', sortOrder: 0 },
    { url: '/uploads/property1/p1-deluxe-living.jpg', alt: 'Deluxe living area - Youth Resources Center, Ho', sortOrder: 1 },
    { url: '/uploads/property1/p1-bathroom2.jpg', alt: 'En-suite bathroom - Youth Resources Center, Ho', sortOrder: 2 },
    { url: '/uploads/property1/p1-hallway.jpg', alt: 'Property hallway - Youth Resources Center, Ho', sortOrder: 3 },
  ],
  'HO-YRC-SUP': [
    { url: '/uploads/property1/p1-business-room.jpg', alt: 'Superior room - Youth Resources Center, Ho', sortOrder: 0 },
    { url: '/uploads/property1/p1-bathroom.jpg', alt: 'Superior bathroom - Youth Resources Center, Ho', sortOrder: 1 },
    { url: '/uploads/property1/p1-exterior.jpg', alt: 'Building exterior - Youth Resources Center, Ho', sortOrder: 2 },
  ],
  'HO-YRC-STD': [
    { url: '/uploads/property1/p1-lodge-bed.jpg', alt: 'Standard room - Youth Resources Center, Ho', sortOrder: 0 },
    { url: '/uploads/property1/p1-std-bed.jpg', alt: 'Standard room alternative - Youth Resources Center, Ho', sortOrder: 1 },
    { url: '/uploads/property1/p1-garden.jpg', alt: 'Property surroundings - Youth Resources Center, Ho', sortOrder: 2 },
  ],
};

async function updateImages() {
  console.log('Updating Property 1 images...');

  for (const [code, images] of Object.entries(property1Images)) {
    const apt = await db.apartment.findUnique({ where: { code } });
    if (!apt) {
      console.log('  Skipping ' + code + ' (not found)');
      continue;
    }

    // Delete old images
    const deleted = await db.apartmentImage.deleteMany({ where: { apartmentId: apt.id } });
    console.log('  ' + code + ': deleted ' + deleted.count + ' old images');

    // Insert new images
    for (const img of images) {
      await db.apartmentImage.create({
        data: {
          apartmentId: apt.id,
          url: img.url,
          alt: img.alt,
          sortOrder: img.sortOrder,
        },
      });
    }
    console.log('  ' + code + ': added ' + images.length + ' new images');
  }

  console.log('Done!');
}

updateImages()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
