import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api2": {
        // This matches all requests starting with "/api2"
        target: "http://192.168.56.2:8000", // Your Seafile server URL
        changeOrigin: true, // Changes the origin of the request to match the target
        secure: false, // Set to false if the target server uses self-signed SSL
      },
      "/api": {
        target: "http://192.168.56.2:8000", // Your Seafile server URL
        changeOrigin: true, // Changes the origin of the request to match the target
        secure: false, // Set to false if the target server uses self-signed SSL
      },
    },
  },
});
