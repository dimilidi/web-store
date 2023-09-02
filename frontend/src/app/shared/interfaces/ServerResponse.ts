import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { Favourite } from "./Favourite";

export interface ServerResponse {
    status: number;
    message: string;
    data: any;
  }