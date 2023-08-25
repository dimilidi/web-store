import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { addToFavouriteProducts, getFavourites } from '../controllers/favouriteController';
import { verifyUser } from '../middlewares/auth';

const app = Router();

app.post('/add', verifyUser, asyncHandler(addToFavouriteProducts));
app.get('/', verifyUser, asyncHandler(getFavourites));


export default app;