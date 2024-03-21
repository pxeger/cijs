import { type MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder): void {
  // pg.createTable("mytable", { ... });
}

export function down(pgm: MigrationBuilder): void {
  // pg.dropTable("mytable");
}
