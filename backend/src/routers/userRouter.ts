import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { login, seedUsers } from '../controllers/userController';

const app = Router();

app.get("/seed", asyncHandler(seedUsers));
app.post("/login", asyncHandler(login));



export default app;