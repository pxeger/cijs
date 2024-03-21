import { type MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder): void {
  // pgm.createTable("mytable", { ... });
}

export function down(pgm: MigrationBuilder): void {
  // pgm.dropTable("mytable");
}
