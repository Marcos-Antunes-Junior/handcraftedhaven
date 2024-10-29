// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

export type User = {
  _id: string;
  username: string;
  email: string;
  profile_img: string;
  profile_description?: string;
  seller_details?: {
    business_name?: string;
    bus_description?: string;
    category?: string;
    _id?: string; // If you want to keep the seller_details _id
  };
  categories?: string[];
  is_seller: boolean;
};
export type Comment = {
  _id: string;
  username: string;
  userId: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};
