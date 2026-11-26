import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

const BUILD_ID = new Date().toISOString();

// src/sw-template.js를 빌드 번호를 넣은 /sw.js로 내보냅니다.
function serviceWorker(): Plugin {
  const code = () => readFileSync("src/sw-template.js", "utf8").replace("__BUILD_ID__", BUILD_ID);
  return {
    name: "service-worker",
    configureServer(server) {
      server.middlewares.use("/sw.js", (_req, res) => { res.setHeader("Content-Type", "text/javascript"); res.end(code()); });
    },
    generateBundle() { if (this.environment?.name !== "client") return; this.emitFile({ type: "asset", fileName: "sw.js", source: code() }); },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare(), serviceWorker()],
  define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
});
