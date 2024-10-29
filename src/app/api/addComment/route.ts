// src/pages/api/addComment.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { productId, userId, username, comment, rating } = await req.json();

        if (!productId || !userId || !username || !comment || !rating) {
            return NextResponse.json({ msg: 'All fields are required' }, { status: 400 });
        }

        const newComment = new Comment({ productId, userId, username, comment, rating });
        await newComment.save();

        return NextResponse.json({ msg: 'Comment added successfully', comment: newComment }, { status: 201 });
    } catch (error) {
        console.error('Error adding comment:', error);
        return NextResponse.json({ msg: 'Failed to add comment', error: error.message }, { status: 500 });
    }
}