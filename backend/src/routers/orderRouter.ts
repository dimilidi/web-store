import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import auth from '../middlewares/auth';
import { createOrder } from '../controllers/orderController';


const app = Router();


app.post('/create',auth, asyncHandler(createOrder));

export default app;



