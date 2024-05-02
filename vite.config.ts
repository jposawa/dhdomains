import { defineConfig } from 'vite'
import * as path from "path";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: {
      "@": path.resolve(__dirname, "./src/"),
      public: path.resolve(__dirname, "./public/"),
    }
	},
})
