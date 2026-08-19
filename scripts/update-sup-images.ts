import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const NEW_IMAGES = [
  { url: '/uploads/property1/p1-sup-living.jpg', alt: 'Superior Room living area - Youth Resources Center, Adaklu Road, Ho' },
  { url: '/uploads/property1/p1-sup-kitchen.jpg', alt: 'Superior Room kitchen - Youth Resources Center, Adaklu Road, Ho' },
];

async function updateSuperiorImages() {
  const apt = await db.apartment.findUnique({ where: { code: 'HO-YRC-SUP' } });
  if (!apt) { console.log('HO-YRC-SUP not found'); return; }

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

updateSuperiorImages()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
