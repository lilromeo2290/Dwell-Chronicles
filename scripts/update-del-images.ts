import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const NEW_IMAGES = [
  { url: '/uploads/property1/p1-del-living.jpg', alt: 'Deluxe Suite living area - Youth Resources Center, Adaklu Road, Ho' },
  { url: '/uploads/property1/p1-del-living2.jpg', alt: 'Deluxe Suite lounge - Youth Resources Center, Adaklu Road, Ho' },
];

async function updateDeluxeImages() {
  const apt = await db.apartment.findUnique({ where: { code: 'HO-YRC-DEL' } });
  if (!apt) { console.log('HO-YRC-DEL not found'); return; }

  const deleted = await db.apartmentImage.deleteMany({ where: { apartmentId: apt.id } });
  console.log('Deleted ' + deleted.count + ' old images for ' + apt.code);

  for (let i = 0; i < NEW_IMAGES.length; i++) {
    await db.apartmentImage.create({
      data: { apartmentId: apt.id, url: NEW_IMAGES[i].url, alt: NEW_IMAGES[i].alt, sortOrder: i },
    });
  }
  console.log('Added ' + NEW_IMAGES.length + ' new images for ' + apt.code);

  const verify = await db.apartmentImage.findMany({ where: { apartmentId: apt.id }, orderBy: { sortOrder: 'asc' } });
  for (const img of verify) {
    console.log('  [' + img.sortOrder + '] ' + img.url);
  }
}

updateDeluxeImages()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
