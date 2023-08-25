import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getProducts, getProductsBySearchTerm, getTags, seedProducts, getProductsByTag, getProductsById, submitUserRating, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { verifyAdmin, verifyUser } from '../middlewares/auth';

const app = Router();

app.post('/add', verifyAdmin,  asyncHandler(createProduct));
app.get("/seed", asyncHandler(seedProducts));
app.get('/', asyncHandler(getProducts));
app.get('/tags',asyncHandler(getTags));
app.get('/tags/:tagName',asyncHandler(getProductsByTag));
app.get('/search/:searchTerm', asyncHandler(getProductsBySearchTerm));
app.get('/:id', asyncHandler(getProductsById));
app.post('/stars', verifyUser,  asyncHandler(submitUserRating));
app.put('/update/:id', verifyAdmin,  asyncHandler(updateProduct));
app.delete('/delete/:id', verifyAdmin,  asyncHandler(deleteProduct));


export default app;