import { Schema, model } from "mongoose";

export interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  favorite: boolean;
  stars: number;
  date: Date;
  numRatings: number;
  averageRating: number; 
  imageUrl: string;
  origins: string[];
}

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
   // description: { type: String},
    tags: { type: [String] },
    date: {type: Date},
    favorite: { type: Boolean, default: false },
    stars: { type: Number, default: 0 },
    numRatings: { type: Number, default: 0 }, 
    averageRating: { type: Number, default: 0 }, 
    imageUrl: { type: String, required: false },
    origins: { type: [String], required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);


const Product = model<Product>("Product", ProductSchema);

export default Product;
