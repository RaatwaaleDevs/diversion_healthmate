import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password, date_of_birth, gender, mobile_no, address } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      date_of_birth,
      gender,
      mobile_no,
      address
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully!' });
  } catch (error) {
    return NextResponse.json({ message: 'User registration failed!', error: error.message }, { status: 500 });
  }
}
