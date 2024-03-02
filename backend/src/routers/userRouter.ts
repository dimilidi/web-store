import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { deleteAccount, editAccount, getAllOrders, getAllUsers, getUserById, login, logout, register, registerAdmin, resetPassword, seedUsers, sendEmail } from '../controllers/userController';
import 
{ verifyAdmin, verifyToken, verifyUser } from '../middlewares/auth'


const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.post("/login", asyncHandler(login));
app.get("/orders", verifyUser, asyncHandler(getAllOrders));
app.get("/", verifyAdmin, asyncHandler(getAllUsers));
app.get("/user", verifyUser, asyncHandler(getUserById)); 
app.post("/register", asyncHandler(register));
app.post("/register-admin", asyncHandler(registerAdmin));
app.put("/edit-account", verifyUser,  asyncHandler(editAccount));
app.delete('/delete-account', verifyUser, asyncHandler(deleteAccount));
app.post('/logout',  asyncHandler(logout));
app.post('/send-email', asyncHandler(sendEmail));
app.post('/reset-password', asyncHandler(resetPassword));


export default app;