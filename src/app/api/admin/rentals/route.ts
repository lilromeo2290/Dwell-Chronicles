import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'rentals.json');

interface Rental {
  id: string;
  title: string;
  location: string;
  propertyType: string;
  priceRange: string;
  price: string;
  bedrooms: string;
  status: 'available' | 'taken';
  imageUrl?: string;
  createdAt: string;
}

async function readData(): Promise<Rental[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeData(data: Rental[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, location, propertyType, priceRange, price, bedrooms, imageUrl } = body;

  if (!title || !location || !propertyType) {
    return NextResponse.json({ error: 'Title, location, and property type are required' }, { status: 400 });
  }

  const data = await readData();
  const newRental: Rental = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    location: location === 'Any Location' ? 'Ho Municipality' : location,
    propertyType,
    priceRange: priceRange || 'Any Price',
    price: price || '',
    bedrooms: bedrooms || 'Any',
    status: 'available',
    imageUrl: imageUrl || '',
    createdAt: new Date().toISOString(),
  };

  data.push(newRental);
  await writeData(data);
  return NextResponse.json(newRental, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const data = await readData();
  const index = data.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Rental not found' }, { status: 404 });
  }

  data[index] = { ...data[index], ...updates };
  await writeData(data);
  return NextResponse.json(data[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const data = await readData();
  const filtered = data.filter((r) => r.id !== id);
  if (filtered.length === data.length) {
    return NextResponse.json({ error: 'Rental not found' }, { status: 404 });
  }

  await writeData(filtered);
  return NextResponse.json({ success: true });
}