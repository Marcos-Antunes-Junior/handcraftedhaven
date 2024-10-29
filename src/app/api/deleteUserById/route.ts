import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';

export async function DELETE (req: Request) {
    try {
        // Connect to the database
        await dbConnect();

        // Extract user ID from the query parameters
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Assuming you pass the user ID as a query parameter

        // Validate input
        if (!id) {
            return NextResponse.json({ msg: "User ID is required" }, { status: 400 });
        }

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ msg: "User deleted successfully" }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ msg: "Internal server error", error: err }, { status: 500 });
    }
}
