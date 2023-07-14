import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { sample_products, sample_tags } from '../data';
import { getProducts, getProductsBySearchTerm, getTags, seedProducts, getProductsByTag, getProductsById } from '../controllers/productController';

const app = Router();

app.get("/seed", asyncHandler(seedProducts));
app.get('/', asyncHandler(getProducts));
app.get('/tags',asyncHandler(getTags));
app.get('/tags/:tagName',asyncHandler(getProductsByTag));
app.get('/search/:searchTerm', asyncHandler(getProductsBySearchTerm));
app.get('/:id', asyncHandler(getProductsById));


export default app;