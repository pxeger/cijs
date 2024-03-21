import { type MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder): void {
  pgm.addColumns("users", {
    oauth_provider: { type: "text", notNull: true },
    oauth_foreign_id: { type: "text", notNull: true },
  });
  pgm.addConstraint("users", "max_1_user_per_email", {
    unique: ["email"],
  });
  pgm.addConstraint("users", "max_1_user_per_foreign_user", {
    unique: ["oauth_provider", "oauth_foreign_id"],
  });
}

export function down(pgm: MigrationBuilder): void {
  pgm.dropConstraint("users", "max_1_user_per_email");
  pgm.dropConstraint("users", "max_1_user_per_foreign_user");
  pgm.dropColumns("users", ["oauth_provider", "oauth_foreign_id"]);
}
