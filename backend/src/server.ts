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
import roleRouter from './routers/roleRouter';
import { CustomResponse } from './middlewares/error';

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




// ROUTERS
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/favourites', favouriteRouter);
app.use('/roles', roleRouter);

// set the public folder that represents the frontend to static
app.use(express.static('public'));
//catch-all route handler redirecting to the frontend rounts
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})


// Response Handler Middleware
app.use((obj: CustomResponse, req:any, res:any, next:any):any => {
    const statusCode = obj.status || 500;
    const message = obj.message || 'Something went wrong.';
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === statusCode), 
        status: statusCode, 
        message: message,
        data: obj.data
    });
})



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Surver running on http://localhost:" + port);
})