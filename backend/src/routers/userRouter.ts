import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { editAccount, getAllOrders, login, register, seedUsers } from '../controllers/userController';
import auth from '../middlewares/auth'


const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.get("/orders", auth, asyncHandler(getAllOrders));
app.post("/login", asyncHandler(login));
app.post("/register", asyncHandler(register));
app.put("/edit-account", auth,  asyncHandler(editAccount))


export default app;