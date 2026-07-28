import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { recipientName: { contains: search } },
        { recipientPhone: { contains: search } },
        { title: { contains: search } },
      ];
    }
    if (type) where.type = type;
    if (status) where.status = status;
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, unknown> = {};
      if (dateFrom) dateFilter.gte = new Date(dateFrom);
      if (dateTo) dateFilter.lte = new Date(dateTo + 'T23:59:59');
      where.createdAt = dateFilter;
    }

    const [history, total] = await Promise.all([
      db.notificationHistory.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.notificationHistory.count({ where }),
    ]);

    return NextResponse.json({ history, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch history';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
