import z, { string } from "zod";

export const configuration = {
  get databaseUrl() {
    return read("database_url");
  },
  get databaseUser() {
    return read("database_user");
  },
  get databasePassword() {
    return read("database_password");
  },
  get port() {
    return readInt("port");
  },
};

/**
 *
 * @param {string} name
 */
function read(name) {
  name = name.toUpperCase();
  const value = process.env[name];
  return string().parse(value);
}

/**
 *
 * @param {string} name
 */
function readInt(name) {
  let value = read(name);
  return z.coerce.number().int().parse(value);
}
