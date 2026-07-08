import { test, expect } from "@playwright/test";
import { RecipesPage } from "../../pages/RecipesPage";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
import { HomePage } from "../../pages/HomePage";

test.describe("Recipes", () => {
  test("user can see a list of recipes", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToRecipesPage();
    const recipesPage = new RecipesPage(page);

    await expect(recipesPage.title).toBeVisible();
    const totalCount = await recipesPage.getTotalRecipesCount();
    expect(totalCount).toBeGreaterThan(0);
    const visibleCount = await recipesPage.recipeNameHeadings.count();
    expect(visibleCount).toBeGreaterThan(0);
    expect(visibleCount).toBeLessThanOrEqual(15);
  });

  test("user can open a single recipe and see its details", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToRecipesPage();
    const recipesPage = new RecipesPage(page);

    const expectedName = await recipesPage.getFirstRecipeName();

    await recipesPage.recipeDetailsLinks.first().click();

    const recipeDetailPage = new RecipeDetailPage(page);
    await expect(page).toHaveURL(/\/recipes\/.+/);
    await expect(recipeDetailPage.recipeTitle).toHaveText(expectedName);
    await expect(recipeDetailPage.ingredientsHeading).toBeVisible();
    await expect(recipeDetailPage.instructionsHeading).toBeVisible();
  });

  test("user can navigate between recipe pages", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.navbar.goToRecipesPage();
    const recipesPage = new RecipesPage(page);

    const totalCount = await recipesPage.getTotalRecipesCount();
    const totalPages = Math.ceil(totalCount / 15);

    test.skip(totalPages <= 1, "To low recipes to test pagination");

    const firstPageFirstRecipe = await recipesPage.getFirstRecipeName();

    await recipesPage.nextPageButton.click();
    const secondPageFirstRecipe = await recipesPage.getFirstRecipeName();
    expect(secondPageFirstRecipe).not.toBe(firstPageFirstRecipe);

    await recipesPage.previousPageButton.click();
    const backOnFirstPage = await recipesPage.getFirstRecipeName();
    expect(backOnFirstPage).toBe(firstPageFirstRecipe);
  });
});
