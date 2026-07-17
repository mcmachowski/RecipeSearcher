import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test("user can see all titles and texts on the Home Page", async ({ page }) => {
    await homePage.expectAllTextsToBeVisible();
  });

  test("user can see all images on the Home Page", async ({ page }) => {
    await homePage.expectAllImagesToBeVisible();
  });
});
