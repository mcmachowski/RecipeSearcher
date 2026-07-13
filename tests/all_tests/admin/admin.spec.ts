import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AdminPage } from "../../pages/AdminPages/AdminPage";
import { AdminUsersListPage } from "../../pages/AdminPages/AdminUsersListPage";

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

  test("admin can see users on a list", async ({ page }) => {
    const adminPage = new AdminPage(page);

    await test.step("admin can see Admin Panel heading", async () => {
      await expect(adminPage.adminTitle).toBeVisible();
      await expect(adminPage.adminTitle).toHaveText("Admin Panel");
    });

    await adminPage.showUsersButton.click();
    const adminUsersListPage = new AdminUsersListPage(page);

    await test.step("admin can see users heading", async () => {
      await expect(adminUsersListPage.pageTitle).toBeVisible();
      await expect(adminUsersListPage.pageTitle).toHaveText("All Users");
    });

    await test.step("admin can see some users", async () => {
      await expect(adminUsersListPage.userItems.first()).toBeVisible();
      const usersCount = await adminUsersListPage.getUsersCount();
      expect(usersCount).toBeGreaterThan(0);
      for (let i = 0; i < usersCount; i++) {
        const user = await adminUsersListPage.getUser(i);

        expect(user.name).not.toBe("");
        expect(user.surname).not.toBe("");
        expect(user.email).toContain("@");
        expect(["User", "Admin"]).toContain(user.accountType);
      }
    });
  });
});
