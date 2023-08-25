import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/roleController";

const app = Router();

app.post("/create", asyncHandler(createRole));
app.put("/update/:id", asyncHandler(updateRole));
app.get("/", asyncHandler(getAllRoles));
app.get("/", asyncHandler(getAllRoles));
app.delete("/deleteRole/:id", asyncHandler(deleteRole));

export default app;
