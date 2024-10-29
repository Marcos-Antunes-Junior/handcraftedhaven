import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

declare var process: {
  env: {
    ACCESS_TOKEN_SECRET: string;
  };
};

export async function POST(req: Request) {
  try {
    dbConnect();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 400 });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ msg: 'Invalid credentials' }, { status: 409 });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return NextResponse.json(
        { msg: 'Wrong email or password' },
        { status: 401 }
      );
    }
    const name = user.username;
    /*if(user.password != password)
    {
        return NextResponse.json({ msg: "Wrong email or password"}, { status: 401})
    }*/

    const token = jwt.sign({ name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 3600 * 1000,
    });
    const response = NextResponse.json(
      { msg: 'User logged in', success: true, username: name, id: user._id },
      { status: 201 }
    );
    response.cookies.set('token', token);
    return response;
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
}
