import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const area = searchParams.get('area');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const minGuests = searchParams.get('minGuests');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newlyAdded = searchParams.get('newlyAdded');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const where: Prisma.ApartmentWhereInput = {};

    if (city) {
      where.city = { contains: city };
    }
    if (area) {
      where.area = { contains: area };
    }
    if (category) {
      where.category = category;
    }
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) {
        where.pricePerNight.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.pricePerNight.lte = parseFloat(maxPrice);
      }
    }
    if (bedrooms) {
      where.bedrooms = parseInt(bedrooms, 10);
    }
    if (minGuests) {
      where.maxGuests = { gte: parseInt(minGuests, 10) };
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { address: { contains: search } },
        { area: { contains: search } },
        { city: { contains: search } },
      ];
    }
    if (featured !== null && featured !== '') {
      where.featured = featured === 'true';
    }
    if (newlyAdded !== null && newlyAdded !== '') {
      where.newlyAdded = newlyAdded === 'true';
    }
    if (status) {
      where.status = status;
    }

    const [apartments, total] = await Promise.all([
      db.apartment.findMany({
        where,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit, 100),
        skip: offset,
      }),
      db.apartment.count({ where }),
    ]);

    return NextResponse.json({ apartments, total });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apartments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
      images,
    } = body;

    if (!name || !code || !description || !address || !city || !area) {
      return NextResponse.json(
        { error: 'Missing required fields: name, code, description, address, city, area' },
        { status: 400 }
      );
    }

    if (pricePerNight === undefined || pricePerNight === null) {
      return NextResponse.json(
        { error: 'Missing required field: pricePerNight' },
        { status: 400 }
      );
    }

    const apartment = await db.apartment.create({
      data: {
        name,
        code,
        description,
        address,
        city,
        area,
        latitude: latitude || null,
        longitude: longitude || null,
        pricePerNight: parseFloat(pricePerNight),
        weeklyPrice: weeklyPrice ? parseFloat(weeklyPrice) : null,
        monthlyPrice: monthlyPrice ? parseFloat(monthlyPrice) : null,
        cleaningFee: cleaningFee ? parseFloat(cleaningFee) : null,
        securityDeposit: securityDeposit ? parseFloat(securityDeposit) : null,
        bedrooms: parseInt(bedrooms, 10),
        bathrooms: parseInt(bathrooms, 10),
        maxGuests: parseInt(maxGuests, 10),
        rating: rating ? parseFloat(rating) : 4.5,
        status: status || 'available',
        category: category || 'standard',
        featured: featured === true,
        newlyAdded: newlyAdded !== false,
        amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities || []),
        whatsappNumber: whatsappNumber || '233204700023',
        images: images
          ? {
              create: (images as Array<{ url: string; alt?: string; sortOrder?: number }>).map(
                (img, index) => ({
                  url: img.url,
                  alt: img.alt || null,
                  sortOrder: img.sortOrder ?? index,
                })
              ),
            }
          : undefined,
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(apartment, { status: 201 });
  } catch (error) {
    console.error('Error creating apartment:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'An apartment with this code already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create apartment' },
      { status: 500 }
    );
  }
}