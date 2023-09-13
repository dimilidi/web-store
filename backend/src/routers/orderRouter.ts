import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { verifyAdmin, verifyUser } from '../middlewares/auth';
import { createOrder, getOrder, payOrder, trackOrder, getAllOrders, deleteOrder, updateOrder} from '../controllers/orderController';



const app = Router();


app.post('/create', verifyUser, asyncHandler(createOrder));
app.get('/newOrderForCurrentUser', verifyUser, asyncHandler(getOrder));
app.post('/pay', verifyUser, asyncHandler(payOrder));
app.get('/track/:id', asyncHandler(trackOrder));
app.get('/', asyncHandler(getAllOrders));
app.put('/update/:id', verifyAdmin,  asyncHandler(updateOrder));
app.delete('/delete/:id', verifyAdmin,  asyncHandler(deleteOrder));


export default app;



