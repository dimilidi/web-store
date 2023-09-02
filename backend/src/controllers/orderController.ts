import { OrderStatus } from "../constants/order_status";
import { createSuccess } from "../middlewares/success";
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


// GET ALL ORDERS
export async function getAllOrders(req: any, res: any, next:any) {
    
    const allOrders = await Order.find();
    console.log(allOrders);
   //return res.status(200).json(allOrders);
    return next(createSuccess(200, "All Orders", allOrders));
}



// GET ORDER
export async function getOrder(req: any, res: any) {
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(400).send();
}

// PAY ORDER
export async function payOrder(req: any, res: any) {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(400).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}

// TRACK ORDER
export async function trackOrder(req: any, res: any) {
    const order = await Order.findById(req.params.id);
    res.send(order);
}


async function getNewOrderForCurrentUser(req: any) {
    return await Order.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
