import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Forces IPv4
    port: 5000, // Changes the port to avoid the "Reserved" range
    strictPort: true, // If 5180 is taken, it will fail instead of trying ::1
  },
});
