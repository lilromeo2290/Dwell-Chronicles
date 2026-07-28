import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const groupId = formData.get('groupId') as string | null;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const text = await file.text();
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length < 2) return NextResponse.json({ error: 'File is empty or has no data rows' }, { status: 400 });

    const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().trim());
    const nameIdx = headers.findIndex((h) => h.includes('name') || h.includes('full'));
    const phoneIdx = headers.findIndex((h) => h.includes('phone') || h.includes('whatsapp') || h.includes('mobile') || h.includes('number'));
    const emailIdx = headers.findIndex((h) => h.includes('email') || h.includes('mail'));
    const locationIdx = headers.findIndex((h) => h.includes('location') || h.includes('city') || h.includes('region'));

    if (phoneIdx === -1) {
      return NextResponse.json({ error: 'Could not find phone column. Use headers like: phone, whatsapp, mobile, number' }, { status: 400 });
    }

    let imported = 0;
    let duplicates = 0;
    let errors = 0;

    for (let i = 1; i < lines.length; i++) {
      try {
        const cols = parseCSVLine(lines[i]);
        const phone = (cols[phoneIdx] || '').replace(/[^0-9+]/g, '');
        if (!phone || phone.length < 10) { errors++; continue; }

        const name = nameIdx >= 0 ? cols[nameIdx] || '' : '';
        const email = emailIdx >= 0 ? cols[emailIdx] || null : null;
        const location = locationIdx >= 0 ? cols[locationIdx] || null : null;

        const existing = await db.subscriber.findFirst({ where: { phone } });
        if (existing) { duplicates++; continue; }

        const subscriber = await db.subscriber.create({
          data: {
            fullName: name || 'Contact ' + (i),
            phone,
            whatsappNumber: phone,
            email,
            location,
            preferredPropertyType: '',
            preferredBudget: '',
            preferredRegion: '',
            preferredDistrict: '',
            preferredStatus: '',
          },
        });

        if (groupId) {
          await db.subscriberGroupMember.create({
            data: { subscriberId: subscriber.id, groupId },
          });
        }
        imported++;
      } catch {
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      totalRows: lines.length - 1,
      imported,
      duplicates,
      errors,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Import failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}