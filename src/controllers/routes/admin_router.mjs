import { Router } from "express";
import { createUser } from "../protocols/admin/user/create_user.mjs";
import { deleteUser } from "../protocols/admin/user/delete_user.mjs";
import { findUsers } from "../protocols/admin/user/find_users.mjs";

export const adminRouter = Router();

adminRouter.post("/users", createUser);
adminRouter.get("/users", findUsers);
adminRouter.delete("/users", deleteUser);
