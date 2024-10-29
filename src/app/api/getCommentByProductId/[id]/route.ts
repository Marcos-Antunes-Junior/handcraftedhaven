import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import mongoose from 'mongoose';

// Get comments by product ID (productId)
export async function GET(req: Request, context: { params?: { id?: string } }) {
  try {
    await dbConnect();

    const productId = context.params?.id; // Get the productId from the request params
    console.log(productId);

    // Check if productId is provided and valid
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ msg: 'Invalid or missing productId' }, { status: 400 });
    }

    // Find comments by product ID
    const comments = await Comment.find({ productId: new mongoose.Types.ObjectId(productId) }); // Convert productId to ObjectId
    
    if (comments.length === 0) {
      return NextResponse.json({ msg: 'No comments found for this product' }, { status: 404 });
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ msg: 'Failed to fetch comments', error }, { status: 500 });
  }
}
