import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

const VALID_STATUSES = ['new', 'confirmed', 'cancelled'] as const;
type EnquiryStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body as { status: EnquiryStatus };

    if (!status) {
      return NextResponse.json(
        { error: 'status field is required' },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const existing = await db.bookingEnquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    const enquiry = await db.bookingEnquiry.update({
      where: { id },
      data: { status },
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

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update enquiry' },
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

    const existing = await db.bookingEnquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    await db.bookingEnquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}