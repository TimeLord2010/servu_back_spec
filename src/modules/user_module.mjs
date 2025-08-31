import bcrypt from "bcrypt";
import { DuplicateEmailError } from "../data/errors/duplicate_email_error.mjs";
import { ResourceNotFound } from "../data/errors/resource_not_found.mjs";
import { userResponseSchema } from "../models/user.mjs";
import { db } from "../services/database.mjs";
import { runWithElapsed } from "../services/logger.mjs";

export class UserModule {
  // MARK: Creates

  /**
   *
   * @param {object} params
   * @param {string} params.email
   * @param {string} params.password
   */
  static async create({ email, password }) {
    return await runWithElapsed("USER:CREATE", async () => {
      if (await UserModule.emailExists(email)) {
        throw new DuplicateEmailError();
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      /** @type {*} */
      const result = await db.create("users", {
        email,
        password: hashedPassword,
      });

      const entity = result[0];

      const responseData = userResponseSchema.parse({
        id: entity.id.toString(),
        email: entity.email,
      });

      return responseData;
    });
  }

  // MARK: Reads

  static async findAll() {
    /** @type {import('../models/user.mjs').Iuser[]} */
    // @ts-ignore
    const users = await db.select("users");

    const responseData = users.map((user) =>
      userResponseSchema.parse({
        id: user.id.toString(),
        email: user.email,
      })
    );

    return responseData;
  }

  /**
   *
   * @param {string} email
   */
  static async emailExists(email) {
    const result = await runWithElapsed("USER:EMAIL_EXISTS", async () => {
      /** @type {import('../models/user.mjs').Iuser[][]} */
      const result = await db.query(
        "SELECT * FROM users WHERE email = $email",
        {
          email,
        }
      );
      const users = result[0];
      return users.length > 0;
    });
    console.log(`Email ${email} does ${result ? "" : "not"} exist`);
    return result;
  }

  /**
   *
   * @param {object} params
   * @param {string} params.email
   * @param {string} params.password
   */
  static async authenticate({ email, password }) {
    return await runWithElapsed("USER:AUTHENTICATE", async () => {
      /** @type {*[][]} */
      const result = await db.query(
        "SELECT * FROM users WHERE email = $email",
        { email }
      );

      /** @type {import('../models/user.mjs').Iuser[]} */
      const users = result[0];
      if (users.length === 0) {
        return null;
      }

      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      return userResponseSchema.parse({
        id: user.id.toString(),
        email: user.email,
      });
    });
  }

  // MARK: Deletes

  /**
   *
   * @param {string} email
   */
  static async deleteByEmail(email) {
    await runWithElapsed("USER:DELETE", async () => {
      const result = await db.query(
        "SELECT id from users where email = $email",
        { email }
      );
      /** @type {import('../models/user.mjs').Iuser[]} */
      // @ts-ignore
      const users = result[0];
      if (users.length == 0) {
        throw new ResourceNotFound();
      }
      db.delete(users[0].id);
    });
  }
}
