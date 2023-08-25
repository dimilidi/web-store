import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/roleController";
import { verifyAdmin } from "../middlewares/auth";

const app = Router();

app.post("/create", verifyAdmin, asyncHandler(createRole));
app.put("/update/:id", verifyAdmin, asyncHandler(updateRole));
app.get("/", asyncHandler(getAllRoles));
app.delete("/deleteRole/:id", asyncHandler(deleteRole));

export default app;
