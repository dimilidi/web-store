import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../middlewares/auth';
import { createOrder, getOrder, payOrder } from '../controllers/orderController';


const app = Router();


app.post('/create',auth, asyncHandler(createOrder));
app.get('/newOrderForCurrentUser',auth, asyncHandler(getOrder));

app.post('/pay', auth, asyncHandler(payOrder));





export default app;



