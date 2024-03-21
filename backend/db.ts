import migrate from "node-pg-migrate";
import { Client, type QueryResult, type QueryResultRow } from "pg";

export const db = new Client({
  host: Bun.env["POSTGRES_HOST"]!,
  port: parseInt(Bun.env["POSTGRES_PORT"] || "5432"),
  database: Bun.env["POSTGRES_DB"]!,
  user: Bun.env["POSTGRES_USER"]!,
  password: Bun.env["POSTGRES_PASSWORD"]!,
});
await db.connect();
await migrate({
  dbClient: db,
  direction: "up",
  // stick with the default options to be the same as the CLI
  dir: __dirname + "/migrations",
  migrationsTable: "pgmigrations",
});

export async function sql(
  [query, ...parts]: TemplateStringsArray,
  ...params: unknown[]
): Promise<QueryResult<QueryResultRow>> {
  if (query === undefined) {
    throw new RangeError("query must not be undefined");
  }
  let i = 1;
  for (const part of parts) {
    query += "$" + i.toString() + part;
    i += 1;
  }
  return await db.query(query, params);
}
