import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@cart": "/src/components/cart",
      "@shared": "/src/components/shared",
      "@store": "/src/components/store",
      "@user": "/src/components/user",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@provider": "/src/provider",
      "@public": "/public",
    },
  },
});
