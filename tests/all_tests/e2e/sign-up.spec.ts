import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUpPage";
import { HomePage } from "../../pages/HomePage";

test.describe("SignUp", () => {
  const baseURL = process.env.BASE_URL!;

  const registerData = {
    firstName: "TestFirstName",
    lastName: "TestLastName",
    email: `test${Date.now()}@test.com`,
    password: "testers",
    imagePath: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  };

  test("User can sign up", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSignUpPage();
    const signUpPage = new SignUpPage(page);
    await expect(page).toHaveURL(`${baseURL}/sign-up`);

    await signUpPage.fillForm(registerData);
    await signUpPage.submit();
    await expect(page).toHaveURL("/");

    await expect(signUpPage.navbar.navSignOutButton).toBeVisible();
  });
});
