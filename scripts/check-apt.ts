import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function check() {
  const a = await db.apartment.findFirst({
    where: { code: 'DH-L3B-002' },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  });
  if (a) {
    console.log('Name:', a.name);
    console.log('Code:', a.code);
    console.log('City:', a.city, '| Area:', a.area);
    console.log('Price:', 'GH₵ ' + a.pricePerNight.toLocaleString(), '/night');
    console.log('Weekly:', a.weeklyPrice ? 'GH₵ ' + a.weeklyPrice.toLocaleString() : 'N/A');
    console.log('Monthly:', a.monthlyPrice ? 'GH₵ ' + a.monthlyPrice.toLocaleString() : 'N/A');
    console.log('Bedrooms:', a.bedrooms, '| Bathrooms:', a.bathrooms, '| Max Guests:', a.maxGuests);
    console.log('Status:', a.status, '| Category:', a.category);
    console.log('Rating:', a.rating, '| Featured:', a.featured);
    console.log('WhatsApp:', a.whatsappNumber);
    console.log('Images:', a.images.length);
    console.log('Amenities:', JSON.parse(a.amenities).join(', '));
  } else {
    console.log('Apartment not found');
  }
  await db.$disconnect();
}
check();