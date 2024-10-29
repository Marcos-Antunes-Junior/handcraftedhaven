import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt'; 
// bcrypt is used to hash passwords
// GET, get all

export async function GET (req: Request) {
    try {
        await dbConnect(); // Ensure the database connection is established
 
        const products = await User.find({}); // Fetch all products from the database
 
        // If there are no products found
        if (products.length === 0) {
            return NextResponse.json({ msg: "No users found" }, { status: 404 });
        }
 
        // Return the list of products
        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        return NextResponse.json({ msg: "Server error", error: err }, { status: 500 });
    }
}