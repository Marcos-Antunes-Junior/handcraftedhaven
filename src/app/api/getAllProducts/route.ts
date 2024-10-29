import { NextResponse } from "next/server";
import dbConnect from '@/src/db/db';
import Product from '@/src/models/productModels';


// GET method to fetch all products
export async function GET (req: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all products from the database
    const products = await Product.find({});

    // Return the products as a JSON response
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Handle any errors that may occur
    console.error("Error fetching products:", error);
    return NextResponse.json({ msg: "Failed to fetch products" }, { status: 500 });
  }
}
