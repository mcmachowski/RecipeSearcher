import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";

test.describe("Profile", () => {
  test("user can go to their profile page and see their data", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();
    const profilePage = new ProfilePage(page);
    await expect(profilePage.title).toBeVisible();
    await expect(profilePage.userIdValue).toBeVisible();
    await expect(profilePage.nameValue).toBeVisible({ timeout: 15000 });
    await expect(profilePage.surnameValue).toBeVisible();
    await expect(profilePage.emailValue).toBeVisible();
    await expect(profilePage.favoritesCountValue).toBeVisible();
  });
});
