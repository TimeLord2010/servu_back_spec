import { createUser } from "../protocols/user/create_user.mjs";
import { findUsers } from "../protocols/user/find_users.mjs";
import { deleteUser } from "../protocols/user/delete_user.mjs";

export function createUserRoutes(app) {
  app.post("/users", createUser);
  app.get("/users", findUsers);
  app.delete("/users", deleteUser);
}
