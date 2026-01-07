import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/se_project_react/", // for GitHub Pages
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
