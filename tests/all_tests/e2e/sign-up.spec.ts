import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUpPage";
import { HomePage } from "../../pages/HomePage";
import { SignUpData } from "../types/SignUpData";
import { registerData } from "../data/signUpData";

test.describe("SignUp", () => {
  const baseURL = process.env.BASE_URL!;

  test("User can sign up", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignUpPage();
    const signUpPage = new SignUpPage(page);
    await expect(page).toHaveURL(`${baseURL}/sign-up`);
    await signUpPage.fillForm(registerData);
    await signUpPage.submit();
    await expect(page).toHaveURL(baseURL);
    await expect(homePage.navbar.navSignOutButton).toBeVisible();
  });
});
