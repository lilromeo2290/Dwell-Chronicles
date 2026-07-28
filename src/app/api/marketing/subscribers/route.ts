import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const group = searchParams.get('group') || '';
    const status = searchParams.get('status') || '';
    const region = searchParams.get('region') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const propertyStatus = searchParams.get('propertyStatus') || '';

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (group) {
      where.groups = { some: { groupId: group } };
    }
    if (status === 'active') where.active = true;
    else if (status === 'inactive') where.active = false;
    if (region) where.preferredRegion = region;
    if (propertyType) where.preferredPropertyType = propertyType;
    if (propertyStatus) where.preferredStatus = propertyStatus;

    const [subscribers, total] = await Promise.all([
      db.subscriber.findMany({
        where,
        include: {
          groups: {
            include: { group: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.subscriber.count({ where }),
    ]);

    return NextResponse.json({ subscribers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch subscribers';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, whatsappNumber, email, location, preferredPropertyType, preferredBudget, preferredRegion, preferredDistrict, preferredStatus, groupIds, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Full name and phone are required' }, { status: 400 });
    }

    const existing = await db.subscriber.findFirst({ where: { phone } });
    if (existing) {
      const updated = await db.subscriber.update({
        where: { id: existing.id },
        data: {
          fullName: fullName || existing.fullName,
          whatsappNumber: whatsappNumber || existing.whatsappNumber,
          email: email || existing.email,
          location: location || existing.location,
          preferredPropertyType: preferredPropertyType || existing.preferredPropertyType,
          preferredBudget: preferredBudget || existing.preferredBudget,
          preferredRegion: preferredRegion || existing.preferredRegion,
          preferredDistrict: preferredDistrict || existing.preferredDistrict,
          preferredStatus: preferredStatus || existing.preferredStatus,
          notes: notes || existing.notes,
          active: true,
        },
        include: { groups: { include: { group: true } } },
      });
      if (groupIds && Array.isArray(groupIds) && groupIds.length > 0) {
        for (const gid of groupIds) {
          const exists = await db.subscriberGroupMember.findFirst({
            where: { subscriberId: existing.id, groupId: gid },
          });
          if (!exists) {
            await db.subscriberGroupMember.create({
              data: { subscriberId: existing.id, groupId: gid },
            });
          }
        }
      }
      return NextResponse.json({ subscriber: updated, updated: true });
    }

    const subscriber = await db.subscriber.create({
      data: {
        fullName,
        phone,
        whatsappNumber: whatsappNumber || phone,
        email,
        location,
        preferredPropertyType: preferredPropertyType || '',
        preferredBudget: preferredBudget || '',
        preferredRegion: preferredRegion || '',
        preferredDistrict: preferredDistrict || '',
        preferredStatus: preferredStatus || '',
        notes,
      },
      include: { groups: { include: { group: true } } },
    });

    if (groupIds && Array.isArray(groupIds) && groupIds.length > 0) {
      await db.subscriberGroupMember.createMany({
        data: groupIds.map((gid: string) => ({
          subscriberId: subscriber.id,
          groupId: gid,
        })),
      });
    }

    return NextResponse.json({ subscriber, updated: false }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create subscriber';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
