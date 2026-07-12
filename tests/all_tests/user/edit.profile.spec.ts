import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SignUpPage } from "../../pages/SignUpPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { UserEditProfilePage } from "../../pages/UserEditProfilePage";
import { SignUpData } from "../types/SignUpData";

test.describe("Edit profile", () => {
  test.describe.configure({ mode: "serial" });

  const tempAuthFile = "playwright/.auth/edit-profile-temp.json";

  const testUser: SignUpData = {
    firstName: "EditTestUser",
    lastName: "EditTestSurname",
    email: `edit-profile-${Date.now()}@test.com`,
    password: "testers123",
    imagePath: "./assets/avatar.png",
  };

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignUpPage();

    const signUpPage = new SignUpPage(page);
    await signUpPage.fillForm(testUser);
    await signUpPage.submit();

    await expect(signUpPage.navbar.navSignOutButton).toBeVisible();

    await page.context().storageState({ path: tempAuthFile });
    await page.close();
  });

  test.use({ storageState: tempAuthFile });

  test("user can edit their profile name", async ({ page }) => {
    const newName = `NewUsername-${Date.now()}`;

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
    const newSurname = `NewSurname-${Date.now()}`;

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
    const newEmail = `edited-${Date.now()}@example.com`;

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
