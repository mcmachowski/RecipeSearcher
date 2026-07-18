import { test, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";
import { HomePage } from "../../pages/HomePage";
import { RecipesPage } from "../../pages/RecipesPage";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
import { myFilters } from "../data/myFilters";
import { myFilters2 } from "../data/myFilters2";
import { URL } from "../data/URLs";
import { recipeDataForTests } from "../data/recipeDataForTest";

test.describe("Search", () => {
  const myCategory = myFilters.category || myFilters2.category;
  const searchedRecipesUrl = `${URL.baseURL}/searched-recipes`;
  let homePage: HomePage;
  let searchPage: SearchPage;
  let searchedRecipesPage: RecipesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    searchedRecipesPage = new RecipesPage(page);
    await homePage.open();
    await homePage.navbar.goToSearchPage();
  });

  test("user can see choosen filters in Filter Panel", async ({ page }) => {
    await searchPage.chooseFilters(myFilters);
    expect(await searchPage.areChoosenFiltersVisible(myFilters)).toBe(true);
    await searchPage.chooseFilters(myFilters2);
    expect(await searchPage.areChoosenFiltersVisible({ ...myFilters, ...myFilters2 })).toBe(true);
  });

  test("user can search for a recipe - without filters", async ({ page }) => {
    await searchPage.searchForRecipe();

    await expect(page).toHaveURL(searchedRecipesUrl);
    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
  });

  test("user can search for a recipe - by filters", async ({ page }) => {
    await searchPage.chooseFilters(myFilters);
    expect(await searchPage.areChoosenFiltersVisible(myFilters)).toBe(true);
    await searchPage.searchForRecipe();
    await expect(page).toHaveURL(searchedRecipesUrl);
    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
    await searchedRecipesPage.goToRecipeDetailPageByIndex(0);
    const recipeDetailPage = new RecipeDetailPage(page);
    expect(await recipeDetailPage.getRecipeCategory()).toBe(myCategory);
  });

  test("user can search for a recipe - by search input", async ({ page }) => {
    await searchPage.searchForRecipe(recipeDataForTests.recipeNameToSearch);
    await expect(page).toHaveURL(searchedRecipesUrl);
    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
    expect(await searchedRecipesPage.recipeNameHeadings.first().textContent()).toContain(recipeDataForTests.recipeNameToSearch);
  });

  test("user can search for a recipe - by search input and filters", async ({ page }) => {
    await searchPage.chooseFilters(myFilters);
    expect(await searchPage.areChoosenFiltersVisible(myFilters)).toBe(true);
    await searchPage.searchForRecipe(recipeDataForTests.recipeNameToSearch);
    await expect(page).toHaveURL(searchedRecipesUrl);
    const totalCount = await searchedRecipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
    expect(await searchedRecipesPage.recipeNameHeadings.first().textContent()).toContain(recipeDataForTests.recipeNameToSearch);
    await searchedRecipesPage.goToRecipeDetailPageByIndex(0);
    const recipeDetailPage = new RecipeDetailPage(page);
    expect(await recipeDetailPage.getRecipeCategory()).toBe(myCategory);
  });
});
