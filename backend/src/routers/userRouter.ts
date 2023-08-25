import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { deleteAccount, editAccount, getAllOrders, getAllUsers, getUserById, login, logout, register, registerAdmin, seedUsers } from '../controllers/userController';
import 
{ verifyAdmin, verifyUser } from '../middlewares/auth'


const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.post("/login", asyncHandler(login));
app.get("/orders", verifyAdmin, asyncHandler(getAllOrders));
app.get("/", verifyAdmin, asyncHandler(getAllUsers));
app.get("/:id", verifyUser, asyncHandler(getUserById));
app.post("/register", asyncHandler(register));
app.post("/register-admin", asyncHandler(registerAdmin));
app.put("/edit-account", verifyUser,  asyncHandler(editAccount));
app.delete('/delete-account', verifyUser, asyncHandler(deleteAccount));
app.post('/logout', verifyUser, asyncHandler(logout));

export default app;