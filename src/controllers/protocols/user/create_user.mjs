import { userCreateSchema } from "../../../models/user.mjs";
import { UserModule } from "../../../modules/user_module.mjs";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createUser(req, res) {
  const validated = userCreateSchema.parse(req.body);

  const newUser = await UserModule.create(validated);
  res.status(201).json({
    message: "Usuário criado com sucesso",
    user: newUser,
  });
}
