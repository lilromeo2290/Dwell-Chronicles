import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalSubscribers,
      activeSubscribers,
      todaySent,
      totalSent,
      totalFailed,
      totalDelivered,
      totalRead,
      propertyNotifs,
      videoNotifs,
      pendingQueue,
      subscriberGrowth7d,
      dailyNotifs7d,
    ] = await Promise.all([
      db.subscriber.count(),
      db.subscriber.count({ where: { active: true } }),
      db.notificationHistory.count({ where: { sentAt: { gte: todayStart } } }),
      db.notificationHistory.count({ where: { status: { in: ['sent', 'delivered', 'read'] } } }),
      db.notificationHistory.count({ where: { status: 'failed' } }),
      db.notificationHistory.count({ where: { status: 'delivered' } }),
      db.notificationHistory.count({ where: { status: 'read' } }),
      db.notificationHistory.count({ where: { type: 'property' } }),
      db.notificationHistory.count({ where: { type: 'video' } }),
      db.notificationQueue.count({ where: { status: 'pending' } }),
      // 7-day subscriber growth
      db.subscriber.count({ where: { subscriptionDate: { gte: weekStart } } }),
      // 7-day daily notifications
      db.notificationHistory.findMany({
        where: { sentAt: { gte: weekStart } },
        select: { sentAt: true, status: true },
      }),
    ]);

    // Build daily chart data for last 7 days
    const dailyData: { date: string; sent: number; failed: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const nextDate = new Date(d);
      nextDate.setDate(nextDate.getDate() + 1);
      const dayNotifs = dailyNotifs7d.filter((n) => {
        if (!n.sentAt) return false;
        return n.sentAt >= d && n.sentAt < nextDate;
      });
      dailyData.push({
        date: dateStr,
        sent: dayNotifs.filter((n) => n.status !== 'failed').length,
        failed: dayNotifs.filter((n) => n.status === 'failed').length,
      });
    }

    // Monthly chart data for last 6 months
    const monthlyData: { month: string; sent: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const label = m.toLocaleString('default', { month: 'short', year: '2-digit' });
      const count = await db.notificationHistory.count({
        where: { sentAt: { gte: m, lte: mEnd }, status: { in: ['sent', 'delivered', 'read'] } },
      });
      monthlyData.push({ month: label, sent: count });
    }

    // Top regions
    const topRegions = await db.subscriber.groupBy({
      by: ['preferredRegion'],
      where: { preferredRegion: { not: '' } },
      _count: true,
      orderBy: { _count: { preferredRegion: 'desc' } },
      take: 5,
    });

    // Top property types
    const topTypes = await db.subscriber.groupBy({
      by: ['preferredPropertyType'],
      where: { preferredPropertyType: { not: '' } },
      _count: true,
      orderBy: { _count: { preferredPropertyType: 'desc' } },
      take: 5,
    });

    const successRate = totalSent + totalFailed > 0
      ? Math.round((totalSent / (totalSent + totalFailed)) * 100)
      : 0;

    return NextResponse.json({
      totalSubscribers,
      activeSubscribers,
      todaySent,
      totalSent,
      totalFailed,
      totalDelivered,
      totalRead,
      propertyNotifs,
      videoNotifs,
      pendingQueue,
      subscriberGrowth7d,
      successRate,
      dailyData,
      monthlyData,
      topRegions: topRegions.map((r) => ({ region: r.preferredRegion, count: r._count })),
      topTypes: topTypes.map((t) => ({ type: t.preferredPropertyType, count: t._count })),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Dashboard fetch failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}