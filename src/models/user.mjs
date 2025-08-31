import { email, object, string } from "zod";

export const userSchema = object({
  email: string().email("Formato de email inválido"),
  password: string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const userCreateSchema = userSchema;

export const userResponseSchema = object({
  id: string(),
  email: email(),
});

export function validateUser(userData) {
  return userSchema.safeParse(userData);
}

/**
 * @typedef {object} Iuser
 * @property {string} id
 * @property {string} email
 * @property {string} password
 */
