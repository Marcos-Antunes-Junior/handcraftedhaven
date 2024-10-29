// PUT
import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function POST (req: Request) {   
    try {
        // Connect to the database
        await dbConnect();
 
        // Parse request body
        const body = await req.json();
        const {username, email, password, profile_img, profile_description, seller_details} = body; 
        // Validate input
        if (!email || !password || !username) {
            return NextResponse.json({ msg: "Please provide all required fields" }, { status: 400 });
        }
 
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ msg: "User already exists with this email" }, { status: 409 });
        }
 
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
 
        // Create a new user document
        const newUser = new User({
            email,
            username,
            password: hashedPassword,  // Store the hashed password
            profile_img, 
            profile_description, 
            seller_details
        });
 
        // Save the new user to the database
        await newUser.save();
 
        // Return success response
        return NextResponse.json({ msg: "User registered successfully", success: true }, { status: 201 });
 
    } catch (err) {
        return NextResponse.json({ msg: "Internal server error", error: err }, { status: 500 });
    }
}