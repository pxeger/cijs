import migrate from "node-pg-migrate";
import { Client } from "pg";

const db = new Client({
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

export default db;
