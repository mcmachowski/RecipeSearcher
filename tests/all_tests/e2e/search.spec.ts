import { test, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";
import { HomePage } from "../../pages/HomePage";
import { RecipesPage } from "../../pages/RecipesPage";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";

test.describe("Search", () => {
  const baseURL = process.env.BASE_URL!;

  let myFilters = {
    category: "Dinner",
    cuisine: "Polish",
    difficulty: "Medium",
    seasonality: "All Seasons",
  };

  let myFilters2 = {
    category: "Snack",
  };

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToSearchPage();
  });

  test("user can see choosen filters in Filter Panel", async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.chooseFilters(myFilters);
    expect(await searchPage.areChoosenFiltersVisible(myFilters)).toBe(true);

    await searchPage.chooseFilters(myFilters2);
    expect(await searchPage.areChoosenFiltersVisible({ ...myFilters, ...myFilters2 })).toBe(true);
  });

  test("user can search for a recipe - without filters", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchForRecipe();

    const searchedRecipesPage = new RecipesPage(page);
    await expect(page).toHaveURL(`${baseURL}/searched-recipes`);

    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
  });

  test("user can search for a recipe - by filters", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.chooseFilters(myFilters);
    expect(await searchPage.areChoosenFiltersVisible(myFilters)).toBe(true);

    await searchPage.searchForRecipe();
    const searchedRecipesPage = new RecipesPage(page);

    await expect(page).toHaveURL(`${baseURL}/searched-recipes`);
    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);

    const myCategory = myFilters.category || myFilters2.category;

    await searchedRecipesPage.goToRecipeDetailPageByIndex(0);

    const recipeDetailPage = new RecipeDetailPage(page);
    expect(await recipeDetailPage.getRecipeCategory()).toBe(myCategory);
  });

  test("user can search for a recipe - by search input", async ({ page }) => {});

  test("user can search for a recipe - by search input and filters", async ({ page }) => {});
});
