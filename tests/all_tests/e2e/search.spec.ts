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

  test("user can see choosen filters in Filter Panel", async () => {
    await searchPage.chooseAndExpectFiltersToBeVisible({ ...myFilters, ...myFilters2 });
  });

  test("user can search for a recipe - without filters", async ({ page }) => {
    await test.step("user fills recipe's name and presses search button", async () => {
      await searchPage.searchForRecipe();
      await expect(page).toHaveURL(searchedRecipesUrl);
    });
    await test.step("user sees at least one recipe", async () => {
      const totalCount = await searchedRecipesPage.getTotalRecipesCount();
      expect(totalCount).toBeGreaterThan(0);
    });
  });

  test("user can search for a recipe - by filters", async ({ page }) => {
    const recipeDetailPage = new RecipeDetailPage(page);

    await test.step("User fills filters", async () => {
      await searchPage.chooseAndExpectFiltersToBeVisible(myFilters);
    });

    await test.step("User searches for a recipe", async () => {
      await searchPage.searchForRecipe();
    });

    await test.step("User checks whether the page redirects to the new URL /searched-recipes", async () => {
      await expect(page).toHaveURL(searchedRecipesUrl);
    });

    await test.step("User checks if there are any recipes visible", async () => {
      const totalCount = await searchedRecipesPage.getTotalRecipesCount();
      expect(totalCount).toBeGreaterThan(0);
    });

    await test.step("User goes to details of the specified recipe", async () => {
      await searchedRecipesPage.goToRecipeDetailPageByIndex(0);
    });

    await test.step("User sees category is correct", async () => {
      expect(await recipeDetailPage.getRecipeCategory()).toBe(myCategory);
    });
  });

  test("user can search for a recipe - by search input", async ({ page }) => {
    await test.step("User searches for a recipe with input name", async () => {
      await searchPage.searchForRecipe(recipeDataForTests.recipeNameToSearch);
    });

    await test.step("User checks whether the page redirects to the new URL /searched-recipes", async () => {
      await expect(page).toHaveURL(searchedRecipesUrl);
    });

    await test.step("User checks if there are any recipes visible", async () => {
      const totalCount = await searchedRecipesPage.getTotalRecipesCount();
      expect(totalCount).toBeGreaterThan(0);
    });

    expect(await searchedRecipesPage.recipeNameHeadings.first().textContent()).toContain(recipeDataForTests.recipeNameToSearch);
  });

  test("user can search for a recipe - by search input and filters", async ({ page }) => {
    await test.step("User fills filters", async () => {
      await searchPage.chooseAndExpectFiltersToBeVisible(myFilters);
    });

    await test.step("User searches for a recipe with input name", async () => {
      await searchPage.searchForRecipe(recipeDataForTests.recipeNameToSearch);
    });

    await test.step("User checks whether the page redirects to the new URL /searched-recipes", async () => {
      await expect(page).toHaveURL(searchedRecipesUrl);
    });

    await test.step("User checks if there are any recipes visible", async () => {
      const totalCount = await searchedRecipesPage.getTotalRecipesCount();
      expect(totalCount).toBeGreaterThan(0);
    });

    await test.step("User can see that title of the searched recipe is correct", async () => {
      expect(await searchedRecipesPage.recipeNameHeadings.first().textContent()).toContain(recipeDataForTests.recipeNameToSearch);
    });

    await searchedRecipesPage.goToRecipeDetailPageByIndex(0);
    const recipeDetailPage = new RecipeDetailPage(page);
    expect(await recipeDetailPage.getRecipeCategory()).toBe(myCategory);
  });
});
