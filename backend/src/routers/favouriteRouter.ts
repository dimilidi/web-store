import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { addToFavouriteProducts, getFavourites } from '../controllers/favouriteController';

const app = Router();

app.post('/add', asyncHandler(addToFavouriteProducts));
app.get('/:userId', asyncHandler(getFavourites));


export default app;