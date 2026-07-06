import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUpPage";

test.describe("SignUp", () => {
  const registerData = {
    firstName: "TestFirstName",
    lastName: "TestLastName",
    email: `test${Date.now()}@test.com`,
    password: "testers",
    imagePath: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  };

  test("User can sign up", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await page.goto("/signup");

    await signUpPage.fillForm(registerData);
    await signUpPage.submit();
    await expect(page).toHaveURL(/dashboard/);
  });
});
