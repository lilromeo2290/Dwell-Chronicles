import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const templates = await db.whatsAppTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ templates });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch templates';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, content, description } = body;
    if (!name || !content) return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    const template = await db.whatsAppTemplate.create({
      data: { name, type: type || 'custom', content, description },
    });
    return NextResponse.json({ template }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create template';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}