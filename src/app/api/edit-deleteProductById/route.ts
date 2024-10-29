import { NextResponse } from 'next/server';
import dbConnect from '@/src/db/db';
import Product from '@/src/models/productModels';
import User from '@/src/models/userModels'; // Ensure the path is correct

// PATCH route to edit a product
export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, productId, title, description, imageUrl } = body;

    if (!userId || !productId) {
      return NextResponse.json({ msg: 'User ID and Product ID are required' }, { status: 400 });
    }

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ msg: 'User not found' }, { status: 404 });
    }

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, idSeller: userId },
      { title, description, imageUrl, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ msg: 'Product not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ msg: 'Product updated successfully', product: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ msg: 'Failed to update product', error }, { status: 500 });
  }
}

// DELETE route to delete a product
export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const productId = searchParams.get('productId');

    if (!userId || !productId) {
      return NextResponse.json({ msg: 'User ID and Product ID are required' }, { status: 400 });
    }

    // Check if the user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ msg: 'User not found' }, { status: 404 });
    }

    // Find and delete the product
    const deletedProduct = await Product.findOneAndDelete({ _id: productId, idSeller: userId });

    if (!deletedProduct) {
      return NextResponse.json({ msg: 'Product not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ msg: 'Product deleted successfully', product: deletedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ msg: 'Failed to delete product', error }, { status: 500 });
  }
}