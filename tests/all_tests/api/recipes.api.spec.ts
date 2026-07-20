import { test, expect } from "@playwright/test";

test.describe("/recipes", async () => {
  const URL = process.env.API_URL!;

  test("GET - all recipes", async ({ request }) => {
    const response = await request.get(`${URL}/recipes`);
    const responseObject = await response.json();

    await test.step("response returns array of recipes", async () => {
      expect(responseObject).toBeTruthy();
      expect(Array.isArray(responseObject.recipes)).toBe(true);
    });

    await test.step("response's array has at least 1 recipe", async () => {
      expect(responseObject.recipes.length).toBeGreaterThan(0);
    });
  });
});
