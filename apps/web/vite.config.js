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
    // Admin API + uploads are served by the Node server (server.js); run it
    // on 3001 (`PORT=3001 node server.js` after a build) to use /admin.html in dev.
    proxy: {
      "/api": "http://localhost:3001",
      "/uploads": "http://localhost:3001",
    },
  },

  build: {
    outDir: "../../dist/apps/web",
    assetsDir: "assets",

    rollupOptions: {
      // admin.html is a separate entry (the /admin panel) so none of its code
      // ends up in the public site's bundle.
      input: {
        index: path.resolve(__dirname, "index.html"),
        admin: path.resolve(__dirname, "admin.html"),
      },
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
          // With two entries (site + admin) Vite would split its tiny
          // modulepreload polyfill into its own chunk — an extra request on
          // every public page. Fold it into the react chunk both already load.
          if (id.includes("modulepreload-polyfill")) return "react";
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