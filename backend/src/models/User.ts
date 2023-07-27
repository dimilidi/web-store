import { Schema, model } from "mongoose";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Order } from "./Order";

interface TokenPayload extends JwtPayload {
    id: string;
  }

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  avatar: string;
  isAdmin: boolean;
   // Add an index signature for dynamic property access
   [key: string]: any;
}

export const UserSchema = new Schema<IUser>({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    address: {type:String, required: true},
    phone: {type:String, required: false},
    avatar: { type: String, default: 'https://freesvg./img/abstract-user-flat-4.png' },
    isAdmin: {type:Boolean, required: true}
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


UserSchema.methods.getAllOrders = async function () {
    try {
      // "this" refers to the user object on which this method is called
      const orders = await Order.find({ user: this._id }).exec();
      return orders;
    } catch (error) {
      throw new Error("Error fetching user orders");
    }
  };
  

  const User = model<IUser>("User", UserSchema);
  
  export default User;








