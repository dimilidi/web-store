import { OrderStatus } from "../constants/order_status";
import { Order } from "../models/Order";

// CREATE ORDER
export async function createOrder(req: any, res: any) {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(400).send('Cart Is Empty!');
        return;
    }

    await Order.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new Order({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
}