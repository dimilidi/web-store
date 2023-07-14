import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { login, register, seedUsers } from '../controllers/userController';

const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.post("/login", asyncHandler(login));
app.post("/register", asyncHandler(register));


export default app;