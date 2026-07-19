import { test as setup, expect, Page } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";

const adminAuthFile = "playwright/.auth/admin.json";
const userAuthFile = "playwright/.auth/user.json";

export async function login(page: Page, email: string, password: string, storagePath: string, isAdmin = false) {
  const baseURL = process.env.BASE_URL!;

  const homePage = new HomePage(page);
  await homePage.open();

  await homePage.navbar.goToSignInPage();

  const signInPage = new SignInPage(page);
  await signInPage.fillForm(email, password);
  await signInPage.submit();

  await expect(page).toHaveURL(baseURL);

  await expect(homePage.navbar.navSignOutButton).toBeVisible();
  await expect(homePage.navbar.navFavoritesButton).toBeVisible();
  await expect(homePage.navbar.navProfileButton).toBeVisible();

  if (isAdmin) {
    await expect(homePage.navbar.navAdminButton).toBeVisible();
  }

  await page.context().storageState({ path: storagePath });
}

setup("authenticate as user", async ({ page }) => {
  await login(page, process.env.NORMAL_USER_EMAIL!, process.env.NORMAL_USER_PASSWORD!, userAuthFile);
});

setup("authenticate as admin", async ({ page }) => {
  await login(page, process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!, adminAuthFile, true);
});
