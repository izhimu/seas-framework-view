// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    host: "0.0.0.0",
    port: 30000,
    proxy: {
      "/api": {
        target: "https://seas-gen.home.izhimu.cn/api/",
        changeOrigin: true,
        secure: false,
        // eslint-disable-next-line no-shadow
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@vue/runtime-core",
        replacement: "@vue/runtime-core/dist/runtime-core.esm-bundler.js",
      },
    ],
  },
  optimizeDeps: {
    include: [
      "date-fns-tz/**",
      "sm-crypto",
      "highlight.js/es/**",
      "highlight.js/lib/**",
      "qs",
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          return null;
        },
      },
    },
  },
});
