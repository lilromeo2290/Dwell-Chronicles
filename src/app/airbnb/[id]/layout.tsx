import type { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const prisma = new PrismaClient();
  try {
    const apt = await prisma.apartment.findUnique({
      where: { id },
      select: { name: true, description: true, city: true, images: { take: 1, select: { url: true } } },
    });
    if (!apt) {
      return { title: 'Apartment Not Found | Dwell Chronicles Ghana' };
    }
    const imgUrl = apt.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80';
    return {
      title: apt.name + ' - Short-Stay Rental in ' + (apt.city || 'Ghana') + ' | Dwell Chronicles',
      description: apt.description ? apt.description.substring(0, 160) : 'Book ' + apt.name + ' on Dwell Chronicles Ghana. Premium short-stay apartment with WiFi, AC, and premium amenities.',
      alternates: { canonical: 'https://dwellchroniclesgh.com/airbnb/' + id },
      openGraph: {
        title: apt.name + ' - Short-Stay Rental | Dwell Chronicles Ghana',
        description: apt.description ? apt.description.substring(0, 160) : 'Book this premium apartment on Dwell Chronicles Ghana.',
        url: 'https://dwellchroniclesgh.com/airbnb/' + id,
        images: [{ url: imgUrl, width: 1200, height: 630, alt: apt.name }],
      },
    };
  } catch {
    return { title: 'Short-Stay Rental | Dwell Chronicles Ghana' };
  } finally {
    await prisma.$disconnect();
  }
}

export default function AirbnbDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
