import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
  define: {
    "import.meta.env.GITHUB_OAUTH_CLIENT_ID": JSON.stringify(
      process.env["GITHUB_OAUTH_CLIENT_ID"],
    ),
  },
});
