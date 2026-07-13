import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AdminPage } from "../../pages/AdminPage";

test.describe("Admin", () => {
  const baseURL = process.env.BASE_URL!;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToAdminPage();
    await expect(page).toHaveURL(`${baseURL}/admin`);
  });

  test("admin can see admin panel", async ({ page }) => {
    const adminPage = new AdminPage(page);
    await expect(adminPage.adminTitle).toBeVisible();
    await expect(adminPage.adminTitle).toHaveText("Admin Panel");
    await expect(adminPage.showRecipesButton).toBeVisible();
    await expect(adminPage.addNewRecipeButton).toBeVisible();
  });
});
