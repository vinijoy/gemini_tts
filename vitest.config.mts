import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    setupFiles: ["@testing-library/jest-dom/vitest"],
    clearMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: "app-jsdom",
          include: ["src/app/**/*.test.tsx"],
          environment: "jsdom",
        },
      },
      {
        extends: true,
        test: {
          name: "node",
          include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
          exclude: ["src/app/**/*.test.tsx"],
          environment: "node",
        },
      },
    ],
  },
});
