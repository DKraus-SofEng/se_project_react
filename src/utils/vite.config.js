/* Vite Test Section */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "DKraus-SofEng/se_project_react"
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
    },
});

