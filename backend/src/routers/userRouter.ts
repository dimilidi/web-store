import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { deleteAccount, editAccount, getAllOrders, login, logout, register, seedUsers } from '../controllers/userController';
import auth from '../middlewares/auth'


const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.get("/orders", auth, asyncHandler(getAllOrders));
app.post("/login", asyncHandler(login));
app.post("/register", asyncHandler(register));
app.put("/edit-account", auth,  asyncHandler(editAccount));
app.delete('/delete-account', auth, asyncHandler(deleteAccount));
app.post('/logout', auth, asyncHandler(logout));

export default app;