import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Home", () => {
  const baseURL = process.env.BASE_URL!;

  test("user can see all titles and texts on the Home Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(homePage.h1title).toBeVisible();
    await expect(homePage.h2subtitle).toBeVisible();
    await expect(homePage.homeParagraph).toBeVisible();
    await expect(homePage.startButton).toBeVisible();
    await expect(homePage.h3subtitle).toBeVisible();
    await expect(homePage.h3normalText).toBeVisible();
    await expect(homePage.h3_2nd_subtitle).toBeVisible();
    await expect(homePage.h3_2nd_normalText).toBeVisible();
    await expect(homePage.lastParagraph).toBeVisible();
    await expect(homePage.joinNowButton).toBeVisible();
  });

  test("user can see all images on the Home Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(homePage.image1).toBeVisible();
    await expect(homePage.image2).toBeVisible();
  });
});
