import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import productRouter from './routers/productRouter'
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import { dbConnect } from './configs/database_config';
import path from 'path';
import favouriteRouter from './routers/favouriteRouter';

// DB CONNECT
dbConnect();

// CREATE EXPRESS SERVER 
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["https://web-store-85da.onrender.com"]
}));
//app.use('/', express.static('/build'))


// ROUTERS
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/favourites', favouriteRouter);

// set the public folder that represents the frontend to static
app.use(express.static('public'));
//catch-all route handler redirecting to the frontend rounts
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Surver running on http://localhost:" + port);
})