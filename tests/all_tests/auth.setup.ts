import { test as setup, expect } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";

const adminAuthFile = "playwright/.auth/admin.json";

setup("authenticate as admin", async ({ page }) => {
  const baseURL = process.env.BASE_URL!;
  const homePage = new HomePage(page);
  await homePage.open();

  await homePage.navbar.goToSignInPage();
  await expect(page).toHaveURL(`${baseURL}/sign-in`);

  const signInPage = new SignInPage(page);
  await signInPage.fillForm(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
  await signInPage.submit();

  await expect(page).not.toHaveURL(`${baseURL}/sign-in`);
  await expect(page).toHaveURL(baseURL);
  await expect(signInPage.navbar.navSignOutButton).toBeVisible();

  await page.context().storageState({ path: adminAuthFile });
});
