import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apartmentId = searchParams.get('apartmentId');

    const where: Record<string, string> = {};
    if (apartmentId) {
      where.apartmentId = apartmentId;
    }

    const enquiries = await db.bookingEnquiry.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        apartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      apartmentId,
      fullName,
      phoneNumber,
      email,
      checkIn,
      checkOut,
      guests,
      specialRequests,
    } = body;

    if (!apartmentId || !fullName || !phoneNumber || !email || !checkIn || !checkOut || guests === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: apartmentId, fullName, phoneNumber, email, checkIn, checkOut, guests' },
        { status: 400 }
      );
    }

    // Verify apartment exists
    const apartment = await db.apartment.findUnique({ where: { id: apartmentId } });
    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const enquiry = await db.bookingEnquiry.create({
      data: {
        apartmentId,
        fullName,
        phoneNumber,
        email,
        checkIn,
        checkOut,
        guests: parseInt(guests, 10),
        specialRequests: specialRequests || null,
        status: 'new',
      },
      include: {
        apartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create enquiry' },
      { status: 500 }
    );
  }
}