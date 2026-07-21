import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getMonthRange(monthParam: string): { start: string; end: string } {
  const now = new Date();
  let year: number;
  let month: number;

  if (monthParam) {
    const [y, m] = monthParam.split('-').map(Number);
    year = y;
    month = m - 1; // JS months are 0-indexed
  } else {
    year = now.getFullYear();
    month = now.getMonth();
  }

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0); // last day of month

  const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

  return { start: startDate, end: endDate };
}

function generateDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start + 'T00:00:00');
  const endDate = new Date(end + 'T00:00:00');

  while (current <= endDate) {
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${d}`);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || '';

    // Verify apartment exists
    const apartment = await db.apartment.findUnique({ where: { id } });
    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    const { start, end } = getMonthRange(month);

    const availabilityRecords = await db.apartmentAvailability.findMany({
      where: {
        apartmentId: id,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: 'asc' },
    });

    // Build a map for quick lookup
    const dateMap = new Map(availabilityRecords.map((r) => [r.date, r.status]));

    // Generate all dates in the range
    const allDates = generateDateRange(start, end);
    const dates = allDates.map((date) => ({
      date,
      status: dateMap.get(date) || 'available',
    }));

    return NextResponse.json({ dates });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
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
    const { dates } = body as { dates: Array<{ date: string; status: string }> };

    if (!Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json(
        { error: 'dates array is required' },
        { status: 400 }
      );
    }

    // Verify apartment exists
    const apartment = await db.apartment.findUnique({ where: { id } });
    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    // Validate dates and statuses
    const validStatuses = ['available', 'booked', 'reserved', 'maintenance'];
    for (const item of dates) {
      if (!item.date || !item.status) {
        return NextResponse.json(
          { error: 'Each date entry must have date and status' },
          { status: 400 }
        );
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        return NextResponse.json(
          { error: `Invalid date format: ${item.date}. Use YYYY-MM-DD` },
          { status: 400 }
        );
      }
      if (!validStatuses.includes(item.status)) {
        return NextResponse.json(
          { error: `Invalid status: ${item.status}. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Use a transaction to upsert all dates
    const updatedDates = await db.$transaction(
      dates.map((item) =>
        db.apartmentAvailability.upsert({
          where: {
            apartmentId_date: {
              apartmentId: id,
              date: item.date,
            },
          },
          create: {
            apartmentId: id,
            date: item.date,
            status: item.status,
          },
          update: {
            status: item.status,
          },
        })
      )
    );

    // Sort by date for consistent response
    updatedDates.sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({ dates: updatedDates });
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { checkIn, checkOut } = body as { checkIn: string; checkOut: string };

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'checkIn and checkOut are required' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (checkIn >= checkOut) {
      return NextResponse.json(
        { error: 'checkIn must be before checkOut' },
        { status: 400 }
      );
    }

    // Verify apartment exists
    const apartment = await db.apartment.findUnique({ where: { id } });
    if (!apartment) {
      return NextResponse.json(
        { error: 'Apartment not found' },
        { status: 404 }
      );
    }

    // Generate all dates in the range
    const dateRange = generateDateRange(checkIn, checkOut);

    // Look up availability for each date
    const availabilityRecords = await db.apartmentAvailability.findMany({
      where: {
        apartmentId: id,
        date: { in: dateRange },
      },
    });

    const dateStatusMap = new Map(availabilityRecords.map((r) => [r.date, r.status]));

    const unavailableDates: string[] = [];
    for (const date of dateRange) {
      const status = dateStatusMap.get(date);
      if (status && status !== 'available') {
        unavailableDates.push(date);
      }
    }

    const available = unavailableDates.length === 0;

    let message: string;
    if (available) {
      message = `Apartment is available from ${checkIn} to ${checkOut}`;
    } else {
      message = `Apartment is not available for ${unavailableDates.length} date(s): ${unavailableDates.join(', ')}`;
    }

    return NextResponse.json({
      available,
      unavailableDates,
      message,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}