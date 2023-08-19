import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getProducts, getProductsBySearchTerm, getTags, seedProducts, getProductsByTag, getProductsById, submitUserRating, createProduct } from '../controllers/productController';
import auth from '../middlewares/auth';

const app = Router();

app.post('/add', auth,  asyncHandler(createProduct));
app.get("/seed", asyncHandler(seedProducts));
app.get('/', asyncHandler(getProducts));
app.get('/tags',asyncHandler(getTags));
app.get('/tags/:tagName',asyncHandler(getProductsByTag));
app.get('/search/:searchTerm', asyncHandler(getProductsBySearchTerm));
app.get('/:id', asyncHandler(getProductsById));
app.post('/stars', auth,  asyncHandler(submitUserRating));


export default app;