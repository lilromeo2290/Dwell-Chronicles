import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendWhatsAppMessage } from '@/lib/marketing/whatsapp';
import type { WhatsAppConfig } from '@/lib/marketing/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, mediaUrl, targetGroupIds, subscriberIds, type, title, scheduledAt, style, propertyData } = body;

    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    // Get WhatsApp config
    const phoneIdSetting = await db.systemSetting.findFirst({ where: { key: 'wa_phone_number_id' } });
    const tokenSetting = await db.systemSetting.findFirst({ where: { key: 'wa_access_token' } });
    const waConfigured = phoneIdSetting && tokenSetting && tokenSetting.value.length > 5;

    let targetSubscribers = await db.subscriber.findMany({
      where: { active: true, whatsappConsent: true },
      select: { id: true, fullName: true, phone, whatsappNumber },
    });

    // Filter by group if specified
    if (targetGroupIds && targetGroupIds.length > 0) {
      const groupMembers = await db.subscriberGroupMember.findMany({
        where: { groupId: { in: targetGroupIds } },
        select: { subscriberId: true },
      });
      const groupSubIds = new Set(groupMembers.map((m) => m.subscriberId));
      targetSubscribers = targetSubscribers.filter((s) => groupSubIds.has(s.id));
    }

    // Filter by specific subscriber IDs
    if (subscriberIds && subscriberIds.length > 0) {
      const subSet = new Set(subscriberIds);
      targetSubscribers = targetSubscribers.filter((s) => subSet.has(s.id));
    }

    // Deduplication: check recent history for same title + type
    if (title && type) {
      const recentNotif = await db.notificationHistory.findFirst({
        where: { title, type, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      });
      if (recentNotif) {
        return NextResponse.json({
          error: 'Duplicate: A notification with the same title and type was sent in the last 24 hours',
          duplicate: true,
          existingNotificationId: recentNotif.id,
        }, { status: 409 });
      }
    }

    const isScheduled = scheduledAt && new Date(scheduledAt) > new Date();
    let queued = 0;
    let sent = 0;
    let failed = 0;

    for (const sub of targetSubscribers) {
      const phone = sub.whatsappNumber || sub.phone;

      if (isScheduled) {
        await db.notificationQueue.create({
          data: {
            subscriberId: sub.id,
            type: type || 'manual',
            title: title || 'Custom Notification',
            recipientPhone: phone,
            message,
            mediaUrl: mediaUrl || null,
            status: 'pending',
            scheduledAt: new Date(scheduledAt),
          },
        });
        queued++;
      } else if (waConfigured) {
        const result = await sendWhatsAppMessage(
          { accessToken: tokenSetting.value, phoneNumberId: phoneIdSetting.value, businessAccountId: '' },
          phone,
          message,
          mediaUrl
        );
        await db.notificationHistory.create({
          data: {
            subscriberId: sub.id,
            type: type || 'manual',
            title: title || 'Custom Notification',
            recipientPhone: phone,
            recipientName: sub.fullName,
            message,
            mediaUrl: mediaUrl || null,
            status: result.success ? 'sent' : 'failed',
            errorMessage: result.error || null,
            sentAt: result.success ? new Date() : null,
          },
        });
        if (result.success) {
          sent++;
          await db.subscriber.update({ where: { id: sub.id }, data: { lastNotificationDate: new Date() } });
        } else {
          failed++;
        }
      } else {
        // Demo mode: simulate sending
        await db.notificationHistory.create({
          data: {
            subscriberId: sub.id,
            type: type || 'manual',
            title: title || 'Custom Notification',
            recipientPhone: phone,
            recipientName: sub.fullName,
            message,
            mediaUrl: mediaUrl || null,
            status: 'sent',
            sentAt: new Date(),
          },
        });
        sent++;
        await db.subscriber.update({ where: { id: sub.id }, data: { lastNotificationDate: new Date() } });
      }
    }

    return NextResponse.json({
      success: true,
      totalTargets: targetSubscribers.length,
      sent,
      failed,
      queued,
      demoMode: !waConfigured,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to send notifications';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
