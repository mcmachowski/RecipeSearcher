import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { UserEditProfilePage } from "../../pages/UserEditProfilePage";

test.describe("Profile", () => {
  const newName = `NewUsername-${Date.now()}`;
  const newSurname = `NewSurname-${Date.now()}`;
  const newEmail = `user-${Date.now()}@example.com`;

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

  test("user can edit their profile name", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();
    const profilePage = new ProfilePage(page);
    await expect(profilePage.nameValue).toBeVisible({ timeout: 15000 });
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillUsername(newName);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.nameValue).toHaveText(newName, { timeout: 15000 });
  });

  test("user can edit their profile surname", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();
    const profilePage = new ProfilePage(page);
    await expect(profilePage.nameValue).toBeVisible({ timeout: 15000 });
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillSurname(newSurname);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.surnameValue).toHaveText(newSurname, { timeout: 15000 });
  });

  test("user can edit their profile email", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();
    const profilePage = new ProfilePage(page);
    await expect(profilePage.nameValue).toBeVisible({ timeout: 15000 });
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillEmail(newEmail);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.emailValue).toHaveText(newEmail, { timeout: 15000 });
  });
});
