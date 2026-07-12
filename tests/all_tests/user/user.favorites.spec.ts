import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { RecipesPage } from "../../pages/RecipesPage";
import { format } from "node:url";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
test.describe.configure({ mode: "serial" });

test.describe("Favorites", () => {
  let addedToFav: boolean;
  let recipeTitle: string;

  test("user can add recipes to favorites and check to see if they've been added", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navbar.goToRecipesPage();
    const recipesPage = new RecipesPage(page);
    await recipesPage.goToRecipeDetailPageByIndex(0);
    recipeTitle = await recipesPage.getFirstRecipeName();
    const recipeDetailPage = new RecipeDetailPage(page);

    if (await recipeDetailPage.removeFromFavButton.isVisible()) {
      addedToFav = true;
    } else if (await recipeDetailPage.addToFavButton.isVisible()) {
      addedToFav = false;
    }

    if (!addedToFav) {
      await recipeDetailPage.addToFavButton.click();
      await expect(recipeDetailPage.removeFromFavButton).toBeVisible();
    }

    await recipeDetailPage.navbar.toToFavoritesPage();

    await expect(page).toHaveURL(/\/favorites\/[a-zA-Z0-9]+$/);
    await expect(recipeDetailPage.recipeTitle).toBeVisible();
  });
});
