import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function updatePrices() {
  // Update HO-MIRAGE-3BR: 1800 -> 2100
  const apt3br = await db.apartment.updateMany({
    where: { code: 'HO-MIRAGE-3BR' },
    data: { pricePerNight: 2100 },
  });
  console.log('HO-MIRAGE-3BR updated: ' + apt3br.count + ' row(s)');

  // Update HO-MIRAGE-2BR: 1400 -> 1800
  const apt2br = await db.apartment.updateMany({
    where: { code: 'HO-MIRAGE-2BR' },
    data: { pricePerNight: 1800 },
  });
  console.log('HO-MIRAGE-2BR updated: ' + apt2br.count + ' row(s)');

  // Verify
  const apartments = await db.apartment.findMany({
    where: { code: { in: ['HO-MIRAGE-3BR', 'HO-MIRAGE-2BR'] } },
    select: { code: true, name: true, pricePerNight: true },
  });
  console.log('Verified prices:');
  for (const a of apartments) {
    console.log('  ' + a.code + ' (' + a.name + '): GHc ' + a.pricePerNight + '/night');
  }
}

updatePrices()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
