import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const groups = await db.subscriberGroup.findMany({
      include: { _count: { select: { members: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ groups });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch groups';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    const group = await db.subscriberGroup.create({
      data: { name, description, color: color || '#5F8768' },
      include: { _count: { select: { members: true } } },
    });
    return NextResponse.json({ group }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create group';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
