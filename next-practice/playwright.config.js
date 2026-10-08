import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  reporter: "list",
  outputDir: ".local/test-results",
  use: { baseURL: "http://127.0.0.1:3000", channel: "msedge", headless: true, viewport: { width: 1440, height: 1000 } },
});
