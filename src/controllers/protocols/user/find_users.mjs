import { UserModule } from "../../../modules/user_module.mjs";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function findUsers(req, res) {
  const users = await UserModule.findAll();
  
  res.json({
    users: users,
  });
}