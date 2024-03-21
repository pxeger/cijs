import { type MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder): void {
  pgm.createTable("users", {
    id: {
      type: "bigserial",
      primaryKey: true,
    },
    email: {
      type: "text",
      notNull: true,
    },
    created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export function down(pgm: MigrationBuilder): void {
  pgm.dropTable("users");
}
