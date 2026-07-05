import { test, expect } from "@playwright/test";

test("not working test example", async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  const recipeButton = page.getByRole("link", { name: "Recipes", exact: true });
  await recipeButton.click();
  await expect(page).toHaveURL(`${process.env.BASE_URL}/search`);
});
