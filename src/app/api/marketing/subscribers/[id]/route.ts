import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subscriber = await db.subscriber.findUnique({
      where: { id },
      include: { groups: { include: { group: true } } },
    });
    if (!subscriber) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ subscriber });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch subscriber';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const subscriber = await db.subscriber.update({
      where: { id },
      data: {
        fullName: body.fullName,
        phone: body.phone,
        whatsappNumber: body.whatsappNumber,
        email: body.email,
        location: body.location,
        preferredPropertyType: body.preferredPropertyType,
        preferredBudget: body.preferredBudget,
        preferredRegion: body.preferredRegion,
        preferredDistrict: body.preferredDistrict,
        preferredStatus: body.preferredStatus,
        active: body.active,
        whatsappConsent: body.whatsappConsent,
        notes: body.notes,
      },
      include: { groups: { include: { group: true } } },
    });
    return NextResponse.json({ subscriber });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update subscriber';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.subscriberGroupMember.deleteMany({ where: { subscriberId: id } });
    await db.subscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to delete subscriber';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
