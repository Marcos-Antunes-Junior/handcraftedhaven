import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt';

export async function PUT(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { id, username, email, password, profile_img, profile_description, seller_details } = body;

        // Required fields validation
        if (!id || !email || !username) {
            return NextResponse.json({ msg: "ID, email, and username are required fields" }, { status: 400 });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        // Update main fields if provided
        existingUser.username = username;
        existingUser.email = email;
        if (profile_img) existingUser.profile_img = profile_img;
        if (profile_description) existingUser.profile_description = profile_description;

        // Unested seller details if provided
        if (seller_details) {
            if (seller_details.category !== undefined) {
                existingUser.seller_details.category = seller_details.category;
            }
            if (seller_details.business_name !== undefined) {
                existingUser.seller_details.business_name = seller_details.business_name;
            }
            if (seller_details.bus_description !== undefined) {
                existingUser.seller_details.bus_description = seller_details.bus_description;
            }
        }

        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
        }

        await existingUser.save();

        return NextResponse.json({ msg: "User updated successfully", success: true }, { status: 200 });
    } catch (err) {
        console.error("Error updating user:", err);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
