import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const rules = await db.automationRule.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ rules });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch rules';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, triggerType, targetType, targetGroupId, templateId } = body;
    if (!name || !triggerType) return NextResponse.json({ error: 'Name and trigger type are required' }, { status: 400 });
    const rule = await db.automationRule.create({
      data: {
        name,
        triggerType,
        targetType: targetType || 'all',
        targetGroupId: targetGroupId || null,
        templateId: templateId || null,
      },
    });
    return NextResponse.json({ rule }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create rule';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
