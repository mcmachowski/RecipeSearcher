import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { UserEditProfilePage } from "../../pages/UserEditProfilePage";
import { SignUpData } from "../types/SignUpData";
import { SignUpPage } from "../../pages/SignUpPage";
test.describe.configure({ mode: "serial" });

test.describe("Profile", () => {
  const baseURL = process.env.BASE_URL!;

  const registerData: SignUpData = {
    firstName: "TestFirstName",
    lastName: "TestLastName",
    email: `test${Date.now()}@test.com`,
    password: "testers",
    imagePath: "./assets/avatar.png",
  };

  test("user can create account, go to profile details and delete an account", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignUpPage();
    const signUpPage = new SignUpPage(page);
    await expect(page).toHaveURL(`${baseURL}/sign-up`);
    await signUpPage.fillForm(registerData);
    await signUpPage.submit();
    await expect(page).toHaveURL(baseURL);
    await expect(homePage.navbar.navSignOutButton).toBeVisible();
    await homePage.navbar.goToProfilePage();

    const profilePage = new ProfilePage(page);
    await profilePage.clickDeleteProfile();
    await profilePage.confirmDelete();
    await expect(page).toHaveURL(baseURL);
    await expect(homePage.navbar.navSignInButton).toBeVisible();
  });
});
