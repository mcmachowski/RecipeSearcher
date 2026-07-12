import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { UserEditProfilePage } from "../../pages/UserEditProfilePage";

test.describe.configure({ mode: "serial" });

test.describe("Profile", () => {
  const user = {
    name: "",
    surname: "",
    password: "",
    email: "",
  };

  test.beforeAll("set up user data", async ({ page }) => {
    user.name = "TestUser";
    user.surname = "TestSurname";
    user.password = "testers";
    user.email = "test.user@example.com";
  });

  test("user can go to their profile page and see their data", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();

    const profilePage = new ProfilePage(page);

    await expect(profilePage.title).toBeVisible();
    await expect(profilePage.userIdValue).toBeVisible();
    await expect(profilePage.nameValue).toHaveText(user.name);
    await expect(profilePage.surnameValue).toHaveText(user.surname);
    await expect(profilePage.emailValue).toHaveText(user.email);
    await expect(profilePage.favoritesCountValue).toBeVisible();
  });

  test("user can edit their profile name", async ({ page }) => {
    const newName = `NewUsername-${Date.now()}`;

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();

    const profilePage = new ProfilePage(page);
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillUsername(newName);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.nameValue).toHaveText(newName);

    user.name = newName;
  });

  test("user can edit their profile surname", async ({ page }) => {
    const newSurname = `NewSurname-${Date.now()}`;

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();

    const profilePage = new ProfilePage(page);
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillSurname(newSurname);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.surnameValue).toHaveText(newSurname);

    user.surname = newSurname;
  });

  test("user can edit their profile email", async ({ page }) => {
    const newEmail = `user-${Date.now()}@example.com`;

    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToProfilePage();

    const profilePage = new ProfilePage(page);
    await profilePage.editProfileButton.click();

    const editProfilePage = new UserEditProfilePage(page);
    await editProfilePage.fillEmail(newEmail);
    await editProfilePage.saveChangesButton.click();

    await expect(profilePage.emailValue).toHaveText(newEmail);

    user.email = newEmail;
  });

  test.afterAll("reset user data", async ({ page }) => {
    user.name = "TestUser";
    user.surname = "TestSurname";
    user.password = "testers";
    user.email = "test.user@example.com";
  });
});
