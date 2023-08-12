import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { addToFavouriteProducts, getFavourites } from '../controllers/favouriteController';
import auth from '../middlewares/auth';

const app = Router();

app.post('/add', auth, asyncHandler(addToFavouriteProducts));
app.get('/',auth, asyncHandler(getFavourites));


export default app;