import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUpPage";
import { HomePage } from "../../pages/HomePage";
import { SignUpData } from "../types/SignUpData";

test.describe("SignUp", () => {
  const baseURL = process.env.BASE_URL!;

  const registerData: SignUpData = {
    firstName: "TestFirstName",
    lastName: "TestLastName",
    email: `test${Date.now()}@test.com`,
    password: "testers",
    imagePath: "tests/assets/avatar.png",
  };

  test("User can sign up", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignUpPage();
    const signUpPage = new SignUpPage(page);
    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    await signUpPage.fillForm(registerData);
    await signUpPage.submit();
    await expect(page).toHaveURL(baseURL);

    await expect(signUpPage.navbar.navSignOutButton).toBeVisible();
  });
});
