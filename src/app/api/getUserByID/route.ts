// app/api/getuserById/route.ts
import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    // Destructure data, leaving out the password
    const { password, ...userData } = user.toObject();
    return NextResponse.json(userData, { status: 200 });

  } catch (err) {
    return NextResponse.json({ msg: "Internal server error", error: err }, { status: 500 });
  }
}
