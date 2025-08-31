// @ts-ignore
import { surrealdbNodeEngines } from "@surrealdb/node";
import { Surreal } from "surrealdb";

export const db = new Surreal({
  engines: surrealdbNodeEngines(),
});
