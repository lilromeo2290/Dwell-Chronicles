import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const group = await db.subscriberGroup.update({
      where: { id },
      data: { name: body.name, description: body.description, color: body.color },
      include: { _count: { select: { members: true } } },
    });
    return NextResponse.json({ group });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update group';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.subscriberGroupMember.deleteMany({ where: { groupId: id } });
    await db.subscriberGroup.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to delete group';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
