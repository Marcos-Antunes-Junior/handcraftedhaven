import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Product from '@/src/models/productModels';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, { params }: { params: { idSeller: string } }) {
  try {
    await dbConnect();

    const { idSeller } = params;

    // Check if idSeller is a valid ObjectId
    if (!ObjectId.isValid(idSeller)) {
      return NextResponse.json({ msg: 'Invalid seller ID' }, { status: 400 });
    }

    // Find all products by idSeller
    const products = await Product.find({ idSeller });
    
    if (products.length === 0) {
      return NextResponse.json({ msg: 'No products found for this seller' }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: 'Failed to fetch products'}, { status: 500 });
  }
}
