import { Product } from "../models/Product";
import { User } from "../models/User";
import { Favourite } from "./Favourite";

export interface UserRegister{
    name : string;
    email : string;
    password : string;
    confirmPassword : string;
    address: string;
  }


  