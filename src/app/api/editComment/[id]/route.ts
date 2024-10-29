import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import mongoose from 'mongoose';

export async function PUT(req: Request, context: { params?: { id?: string } }) {
  try {
    await dbConnect();

    const id = context.params?.id;

    // Check if the ID is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ msg: 'Invalid or missing id' }, { status: 400 });
    }

    // Parse the request body for the updated data
    const updatedData = await req.json();

    // Add the current date to the updatedData for updatedAt field
    updatedData.updatedAt = new Date();

    // Find the comment by ID and update it with new data
    const updatedComment = await Comment.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedComment) {
      return NextResponse.json({ msg: 'Id not found' }, { status: 404 });
    }

    return NextResponse.json({ msg: 'Comment updated successfully', comment: updatedComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: 'Failed to update comment' }, { status: 500 });
  }
}
