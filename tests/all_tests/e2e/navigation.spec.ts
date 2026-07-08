import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Navigation", () => {
  const baseURL = process.env.BASE_URL!;

  test("user can navigate from Home to Search Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToSearchPage();
    await expect(page).toHaveURL(`${baseURL}/search`);
  });

  test("user can navigate from Home to Recipes Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToRecipesPage();
    await expect(page).toHaveURL(`${baseURL}/recipes`);
  });

  test("user can navigate from Home to Sign In Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToSignInPage();
    await expect(page).toHaveURL(`${baseURL}/sign-in`);
  });

  test("user can navigate from Home to Sign Up Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToSignUpPage();
    await expect(page).toHaveURL(`${baseURL}/sign-up`);
  });

  test("user can navigate to Search Page and come back to Home Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToSearchPage();
    await expect(page).toHaveURL(`${baseURL}/search`);
    await homePage.navbar.goToHomePageByHomeButton();
    await expect(page).toHaveURL(baseURL);
  });

  test("user can navigate to Search Page and come back to Home Page with logo button", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page).toHaveURL(baseURL);
    await homePage.navbar.goToSearchPage();
    await expect(page).toHaveURL(`${baseURL}/search`);
    await homePage.navbar.goToHomePageByLogo();
    await expect(page).toHaveURL(baseURL);
  });
});
