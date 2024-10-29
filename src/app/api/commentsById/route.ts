import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import Comment from '@/src/models/commentModels';
import mongoose from 'mongoose';

export async function GET (req: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Extract userId from the query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId'); // Assuming you pass the user ID as a query parameter

        // Validate input
        if (!userId) {
            return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
        }

        // Validate that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ msg: "Invalid User ID" }, { status: 400 });
        }

        // Find comments by userId
        const comments = await Comment.find({ userId }).populate('artworkId', 'title'); // Populating artworkId to get related data if needed
        if (!comments || comments.length === 0) {
            return NextResponse.json({ msg: "No comments found for this user" }, { status: 404 });
        }

        // Return comments data
        return NextResponse.json(comments, { status: 200 });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        return NextResponse.json({ msg: "Internal server error", error: errorMessage }, { status: 500 });
    }
}