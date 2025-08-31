import { email, object, string } from "zod";
import { UserModule } from "../../../modules/user_module.mjs";

const authSchema = object({
  email: email("Formato de email inválido"),
  password: string().min(1, "Senha é obrigatória"),
});

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function authByPass(req, res) {
  const validated = authSchema.parse(req.body);

  const user = await UserModule.authenticate(validated);

  if (!user) {
    return res.status(401).json({
      error: {
        message: "Credenciais inválidas",
      },
    });
  }

  res.status(200).json({
    message: "Autenticação bem-sucedida",
    user,
  });
}
