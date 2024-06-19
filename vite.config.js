import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/loan2024/',
});
// export default defineConfig({
//   base: '/loan2024/',
//   // other configurations
// });
