import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SignUpPage } from "../../pages/SignUpPage";
import { SignInPage } from "../../pages/SignInPage";
import { SignUpData } from "../types/SignUpData";
import { registeredUser } from "../data/signInData";

test.describe("SignIn", () => {
  const baseURL = process.env.BASE_URL!;
  let homePage: HomePage;
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignInPage();
    signInPage = new SignInPage(page);
  });

  test("user can sign in with valid credentials", async ({ page }) => {
    await signInPage.fillForm(registeredUser.email, registeredUser.password);
    await signInPage.submit();
    await expect(signInPage.navbar.navSignOutButton).toBeVisible();
  });

  test("user sees an error with a wrong password", async ({ page }) => {
    await signInPage.fillForm(registeredUser.email, "wrongPassword123");
    await signInPage.submit();
    await expect(signInPage.errorMessage).toBeVisible();
    await expect(signInPage.errorMessage).toHaveText("Invalid credentials, could not sign in.");
    await expect(page).toHaveURL(`${baseURL}/sign-in`);
  });

  test("user sees an error with a non-existent email", async ({ page }) => {
    await signInPage.fillForm(`nobody@gmail.com`, "randomPassword");
    await signInPage.submit();
    await expect(signInPage.errorMessage).toBeVisible();
    await expect(signInPage.errorMessage).toHaveText("Invalid credentials, could not sign in.");
  });
});
