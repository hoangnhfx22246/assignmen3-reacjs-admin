import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/assignmen3-reacjs-admin/",
  server: {
    port: 3001,
  },
});
