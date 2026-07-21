import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const apartment = await db.apartment.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        availabilityDates: {
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apartment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = await db.apartment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const {
      name,
      code,
      description,
      address,
      city,
      area,
      latitude,
      longitude,
      pricePerNight,
      weeklyPrice,
      monthlyPrice,
      cleaningFee,
      securityDeposit,
      bedrooms,
      bathrooms,
      maxGuests,
      rating,
      status,
      category,
      featured,
      newlyAdded,
      amenities,
      whatsappNumber,
    } = body;

    const apartment = await db.apartment.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(code !== undefined && { code }),
        ...(description !== undefined && { description }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(area !== undefined && { area }),
        ...(latitude !== undefined && { latitude: latitude || null }),
        ...(longitude !== undefined && { longitude: longitude || null }),
        ...(pricePerNight !== undefined && { pricePerNight: parseFloat(pricePerNight) }),
        ...(weeklyPrice !== undefined && { weeklyPrice: weeklyPrice ? parseFloat(weeklyPrice) : null }),
        ...(monthlyPrice !== undefined && { monthlyPrice: monthlyPrice ? parseFloat(monthlyPrice) : null }),
        ...(cleaningFee !== undefined && { cleaningFee: cleaningFee ? parseFloat(cleaningFee) : null }),
        ...(securityDeposit !== undefined && { securityDeposit: securityDeposit ? parseFloat(securityDeposit) : null }),
        ...(bedrooms !== undefined && { bedrooms: parseInt(bedrooms, 10) }),
        ...(bathrooms !== undefined && { bathrooms: parseInt(bathrooms, 10) }),
        ...(maxGuests !== undefined && { maxGuests: parseInt(maxGuests, 10) }),
        ...(rating !== undefined && { rating: parseFloat(rating) }),
        ...(status !== undefined && { status }),
        ...(category !== undefined && { category }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(newlyAdded !== undefined && { newlyAdded: Boolean(newlyAdded) }),
        ...(amenities !== undefined && {
          amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities),
        }),
        ...(whatsappNumber !== undefined && { whatsappNumber }),
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(apartment);
  } catch (error) {
    console.error('Error updating apartment:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'An apartment with this code already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update apartment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existing = await db.apartment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    await db.apartment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    return NextResponse.json(
      { error: 'Failed to delete apartment' },
      { status: 500 }
    );
  }
}