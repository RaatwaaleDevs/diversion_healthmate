export const dynamic = 'force-dynamic';  // Force Next.js to treat this route as dynamic

import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ message: 'MongoDB connection successful!' });
  } catch (error) {
    return NextResponse.json({ message: 'MongoDB connection failed!', error: error.message }, { status: 500 });
  }
}
