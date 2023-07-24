import { CartItem } from "./CartItem";

export class Cart{
  user!: string;
  items:CartItem[] = [];
  totalPrice:number = 0;
  totalCount:number = 0;
}
