import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Only Vite's content-hashed bundles live here; public assets keep their URLs.
  build: { assetsDir: "build" },
});
