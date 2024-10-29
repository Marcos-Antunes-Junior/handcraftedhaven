import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Get comments by userId
export async function GET(req: Request, context: { params?: { id?: string } }) {
  try {
    await dbConnect();

    const userId = context.params?.id;
    console.log(userId);

   // Check if userId is provided and valid
   if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ msg: 'Invalid or missing userId' }, { status: 400 });
  }

    // Find comments by userId
    const comments = await Comment.find({ userId });
    if (comments.length === 0) {
      return NextResponse.json({ msg: 'No comments found for this user' }, { status: 404 });
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ msg: 'Failed to fetch comments', error }, { status: 500 });
  }
}
