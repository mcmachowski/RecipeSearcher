import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  globalSetup: require.resolve("./global-setup"),
  testDir: "./all_tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "admin-tests",
      testMatch: /.*admin.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/admin.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "chromium",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*admin.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
