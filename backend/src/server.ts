import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import productRouter from './routers/productRouter'
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import { dbConnect } from './configs/database_config';

// DB CONNECT
dbConnect();

// CREATE EXPRESS SERVER 
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
app.use(express.static('public'));

// ROUTERS
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Surver running on http://localhost:" + port);
})