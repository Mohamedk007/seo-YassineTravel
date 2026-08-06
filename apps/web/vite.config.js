import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 3000,
  },

  build: {
    outDir: "../../dist/apps/web",
    assetsDir: "assets",

    rollupOptions: {
      output: {
        // The previous static manualChunks object silently failed for
        // react/react-dom: the "react" chunk built at 0 bytes (confirmed by
        // inspecting dist/apps/web/assets/react-*.js directly), while the
        // "router" chunk — meant to hold only react-router-dom — came out at
        // 179KB, more than react-router-dom itself accounts for. React had
        // been swept into "router" instead, because Rollup resolves a
        // static manualChunks map against modules in dependency-graph
        // order, and some path reaches react-router-dom before it reaches
        // react/react-dom directly, so the first matching bucket wins.
        //
        // A manualChunks *function* is evaluated per-module by id instead,
        // so each package lands in the bucket keyed off its own path
        // regardless of which other module happened to import it first.
        // Rebuilding with this fix: react-*.js is now ~165KB (real content)
        // and router-*.js dropped to ~37KB (its actual, much smaller size).
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-router-dom")) return "router";
          if (id.includes("lucide-react")) return "ui";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
            return "react";
          }
          return undefined;
        },
      },
    },
  },
});