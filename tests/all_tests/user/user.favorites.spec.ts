import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { RecipesPage } from "../../pages/RecipesPage";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
test.describe.configure({ mode: "serial" });

test.describe("Favorites", () => {
  let addedToFav: boolean;
  let recipeTitle: string;

  let homePage: HomePage;
  let recipesPage: RecipesPage;
  let recipeDetailPage: RecipeDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    recipesPage = new RecipesPage(page);
    recipeDetailPage = new RecipeDetailPage(page);

    await homePage.open();
    await homePage.navbar.goToRecipesPage();
    await recipesPage.goToRecipeDetailPageByIndex(0);
    recipeTitle = (await recipeDetailPage.recipeTitle.textContent()) as string;
  });

  test("user can add recipes to favorites and check to see if they've been added", async ({ page }) => {
    if (await recipeDetailPage.removeFromFavButton.isVisible()) {
      addedToFav = true;
    } else if (await recipeDetailPage.addToFavButton.isVisible()) {
      addedToFav = false;
    }
    if (!addedToFav) {
      await recipeDetailPage.addToFavButton.click();
      await expect(recipeDetailPage.removeFromFavButton).toBeVisible();
    }
    await recipeDetailPage.navbar.goToFavoritesPage();
    await expect(page).toHaveURL(/\/favorites\/[a-zA-Z0-9]+$/);
    await recipesPage.goToRecipeDetailPageByIndex(0);
    await expect(recipeDetailPage.recipeTitle).toBeVisible();
    await expect(recipeDetailPage.recipeTitle).toHaveText(recipeTitle);
  });

  test("user can delete recipes from favorites and check to see if they've been removed", async ({ page }) => {
    if (await recipeDetailPage.removeFromFavButton.isVisible()) {
      addedToFav = true;
    } else if (await recipeDetailPage.addToFavButton.isVisible()) {
      addedToFav = false;
    }

    if (addedToFav) {
      await recipeDetailPage.removeFromFavButton.click();
      await expect(recipeDetailPage.addToFavButton).toBeVisible();
    }
    await recipeDetailPage.navbar.goToFavoritesPage();
    await expect(page).toHaveURL(/\/favorites\/[a-zA-Z0-9]+$/);
    await expect(recipesPage.pageTitle).toBeVisible();
    await expect(recipesPage.pageTitle).toHaveText("No recipes found.");
  });
});
