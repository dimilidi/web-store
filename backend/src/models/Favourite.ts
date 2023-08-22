import { model, Schema, Types } from "mongoose";
import { Product } from "./Product";
import { IUser } from "./User";

export interface Favourite {
  user: IUser;
  product: Product;
}

export const FavouriteSchema = new Schema<Favourite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
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

const Favourite = model("Favourite", FavouriteSchema);

export default Favourite;
