import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  const all = await db.apartment.findMany({
    select: { code: true, name: true, area: true, pricePerNight: true, status: true },
  });
  console.log('Total apartments:', all.length);
  for (const a of all) {
    console.log('  ' + a.code + ' | area=' + a.area + ' | GHc' + a.pricePerNight + ' | ' + a.status + ' | ' + a.name);
  }
}
main().catch(console.error).finally(() => db.$disconnect());
