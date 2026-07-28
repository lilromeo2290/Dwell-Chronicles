import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const queue = await db.notificationQueue.findMany({
      where: { status: { in: ['pending', 'failed'] } },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
      include: { subscriber: { select: { fullName: true, phone: true } } },
      take: 100,
    });
    const counts = await db.notificationQueue.groupBy({
      by: ['status'],
      _count: true,
    });
    const statusCounts: Record<string, number> = {};
    for (const c of counts) {
      statusCounts[c.status] = c._count;
    }
    return NextResponse.json({ queue, statusCounts });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch queue';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, queueIds } = body;

    if (action === 'pause' && queueIds) {
      await db.notificationQueue.updateMany({
        where: { id: { in: queueIds } },
        data: { status: 'paused' },
      });
    } else if (action === 'resume' && queueIds) {
      await db.notificationQueue.updateMany({
        where: { id: { in: queueIds } },
        data: { status: 'pending' },
      });
    } else if (action === 'retry') {
      const failed = await db.notificationQueue.findMany({
        where: { status: 'failed', retryCount: { lt: 3 } },
      });
      for (const item of failed) {
        await db.notificationQueue.update({
          where: { id: item.id },
          data: { status: 'pending', retryCount: item.retryCount + 1 },
        });
      }
      return NextResponse.json({ retried: failed.length });
    } else if (action === 'cancel' && queueIds) {
      await db.notificationQueue.deleteMany({
        where: { id: { in: queueIds } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Queue action failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
