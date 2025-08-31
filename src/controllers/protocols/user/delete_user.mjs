import { UserModule } from "../../../modules/user_module.mjs";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteUser(req, res) {
  const { email } = req.body;

  await UserModule.deleteByEmail(email);
  res.status(200).json({
    message: "Usuário deletado com sucesso",
  });
}