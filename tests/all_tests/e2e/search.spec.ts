import { test, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";
import { HomePage } from "../../pages/HomePage";
import { RecipesPage } from "../../pages/RecipesPage";

test.describe("Search", () => {
  const baseURL = process.env.BASE_URL!;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSearchPage();
  });

  test("user can search without filters", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchForRecipe();

    const searchedRecipesPage = new RecipesPage(page);
    await expect(page).toHaveURL(`${baseURL}/searched-recipes`);

    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
  });
});
