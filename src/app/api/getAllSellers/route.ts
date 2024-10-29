import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import User from '@/src/models/userModels';
import bcrypt from 'bcrypt'; 
// bcrypt is used to hash passwords

export async function GET(req: Request) {
    try {
        await dbConnect(); 
        
        const filterCriteria = { is_seller: true };
        
        const users = await User.find(filterCriteria); 
        
        // if no sellers found
        if (users.length === 0) {
            return NextResponse.json({ msg: "No sellers found" }, { status: 404 });
        }
        
        // return list of sellers
        return NextResponse.json(users, { status: 200 });
    } catch (err) {
        return NextResponse.json({ msg: "Server error", error: err }, { status: 500 });
    }
}
