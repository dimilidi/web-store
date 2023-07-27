import { Product } from "../models/Product";
import { User } from "../models/User";

export interface Favourite{
    product:Product;
    user:User;
  }