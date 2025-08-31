import { createUser } from "../protocols/user/create_user.mjs";
import { findUsers } from "../protocols/user/find_users.mjs";

export function createUserRoutes(app) {
  app.post("/users", createUser);
  app.get("/users", findUsers);
}
