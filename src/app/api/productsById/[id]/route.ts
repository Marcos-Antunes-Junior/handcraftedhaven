import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Product from '@/src/models/productModels';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export async function GET(req: Request, context: { params?: { id?: string } }) {
    try {
      await dbConnect();
  
      const id = context.params?.id  
      // Check if ID is provided and valid
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ msg: 'Invalid or missing product ID' }, { status: 400 });
      }
  
      // Find the product explicitly using _id
      const product = await Product.findById(id );
      if (!product) {
        return NextResponse.json({ msg: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json({ msg: 'Failed to fetch product', error }, { status: 500 });
    }
  }


  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      await dbConnect();
  
      const { id } = params;
  
      // Check if the ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ msg: 'Invalid product ID' }, { status: 400 });
      }
  
      // Parse the request body for the updated data
      const updatedData = await req.json();
  
      // Find the product by ID and update it with new data
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
      if (!updatedProduct) {
        return NextResponse.json({ msg: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ msg: 'Product updated successfully', product: updatedProduct }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ msg: 'Failed to update product'}, { status: 500 });
    }
  }

  export async function DELETE(req: Request, context: { params?: { id?: string } }) {
    try {
      await dbConnect();
      const id = context.params?.id;
  
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ msg: 'Invalid or missing product ID' }, { status: 400 });
      }
  
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
      if (!deletedProduct) {
        return NextResponse.json({ msg: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ msg: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json({ msg: 'Failed to delete product', error}, { status: 500 });
    }
  }
  