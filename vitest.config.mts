import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true, // Use tsconfig paths for module resolution
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
      trace: process.env.CI ? "retain-on-failure" : "off", // Retain traces on CI for debugging, but not locally
    },
    globals: true, // Allow to use test functions like `describe`, `it`, and `expect` without importing them
  },
});
