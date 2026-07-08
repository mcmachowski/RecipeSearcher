import { request } from "@playwright/test";

async function globalSetup() {
  const apiUrl = process.env.API_URL ?? "https://recipesearcher-2nqq.onrender.com";
  const context = await request.newContext();

  console.log("Trying to wake up backend");
  try {
    await context.get(`${apiUrl}/health`, { timeout: 90000 });
    console.log("Backend gotowy.");
  } catch (error) {
    console.warn("No response from backend for 90 seconds");
  }

  await context.dispose();
}

export default globalSetup;
