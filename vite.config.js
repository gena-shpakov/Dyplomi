import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  root: "src",
  plugins: [viteSingleFile()],
  build: {
    target: "esnext",
    minify: true,
    outDir: "../dist", // щоб dist був у корені
    emptyOutDir: true,
  },
});
