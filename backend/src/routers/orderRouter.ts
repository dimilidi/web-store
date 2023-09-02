import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { verifyUser } from '../middlewares/auth';
import { createOrder, getOrder, payOrder, trackOrder, getAllOrders} from '../controllers/orderController';



const app = Router();


app.post('/create', verifyUser, asyncHandler(createOrder));
app.get('/newOrderForCurrentUser', verifyUser, asyncHandler(getOrder));
app.post('/pay', verifyUser, asyncHandler(payOrder));
app.get('/track/:id', asyncHandler(trackOrder));
app.get('/', asyncHandler(getAllOrders));


export default app;



