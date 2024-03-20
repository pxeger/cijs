import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.GITHUB_OAUTH_CLIENT_ID": JSON.stringify(
      process.env.GITHUB_OAUTH_CLIENT_ID,
    ),
  },
});
