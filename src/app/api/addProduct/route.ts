import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Product from '@/src/models/productModels';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json(); // Parse the request body
    const { idSeller, title, description, imageUrl } = body;

    // Validate the input
    if (!idSeller || !title || !description || !imageUrl) {
      return NextResponse.json({ msg: 'All fields are required' }, { status: 400 });
    }

    // Create a new product
    const newProduct = new Product({
      idSeller,
      title,
      description,
      imageUrl,
      createdAt: new Date(), // Optional: set createdAt to current date
    });

    // Save the product to the database
    await newProduct.save();

    return NextResponse.json({ msg: 'Product added successfully', product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ msg: 'Failed to add product', error}, { status: 500 });
  }
}
