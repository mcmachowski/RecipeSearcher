import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AdminPage } from "../../pages/AdminPages/AdminPage";
import { AdminUsersListPage } from "../../pages/AdminPages/AdminUsersListPage";
import { AdminAddRecipePage } from "../../pages/AdminPages/AdminAddRecipePage";
import { RecipeData } from "../types/RecipeData";
import { RecipesPage } from "../../pages/RecipesPage";
import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
import { EditRecipPage } from "../../pages/EditRecipePage";

const baseURL = process.env.BASE_URL!;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  await homePage.navbar.goToAdminPage();
  await expect(page).toHaveURL(`${baseURL}/admin`);
});

test.describe("Admin", () => {
  test("admin can see admin panel", async ({ page }) => {
    const adminPage = new AdminPage(page);
    await expect(adminPage.adminTitle).toBeVisible();
    await expect(adminPage.adminTitle).toHaveText("Admin Panel");
    await expect(adminPage.showRecipesButton).toBeVisible();
    await expect(adminPage.addNewRecipeButton).toBeVisible();
  });

  test("admin can see users on a list", async ({ page }) => {
    const adminPage = new AdminPage(page);

    await test.step("admin can see Admin Panel heading", async () => {
      await expect(adminPage.adminTitle).toBeVisible();
      await expect(adminPage.adminTitle).toHaveText("Admin Panel");
    });

    await adminPage.showUsersButton.click();
    const adminUsersListPage = new AdminUsersListPage(page);

    await test.step("admin can see users heading", async () => {
      await expect(adminUsersListPage.pageTitle).toBeVisible();
      await expect(adminUsersListPage.pageTitle).toHaveText("All Users");
    });

    await test.step("admin can see some users", async () => {
      await expect(adminUsersListPage.userItems.first()).toBeVisible();
      const usersCount = await adminUsersListPage.getUsersCount();
      expect(usersCount).toBeGreaterThan(0);
      for (let i = 0; i < usersCount; i++) {
        const user = await adminUsersListPage.getUser(i);

        expect(user.name).not.toBe("");
        expect(user.surname).not.toBe("");
        expect(user.email).toContain("@");
        expect(["User", "Admin"]).toContain(user.accountType);
      }
    });
  });

  test.describe("Recipe management", () => {
    test.describe.configure({ mode: "serial" });
    const exampleRecipe: RecipeData = {
      name: "exampleRecipeName",
      ingredients: "test1",
      instructions: "Test this recipe.",
      imagePath: "./assets/avatar.png",
      time: 10,
      category: "Dinner",
      cuisine: "Polish",
      difficulty: "Easy",
      seasonality: "All Seasons",
      specialDiet: "None",
    };

    const changedRecipeName: string = "changedRecipeName";

    test("admin can add recipe and see it in recipes list", async ({ page }) => {
      const adminPage = new AdminPage(page);
      await expect(adminPage.addNewRecipeButton).toBeVisible();
      await adminPage.addNewRecipeButton.click();
      const adminAddRecipePage = new AdminAddRecipePage(page);
      await expect(page).toHaveURL(`${baseURL}/admin/recipes/add-recipe`);
      await expect(adminAddRecipePage.pageTitle).toBeVisible();

      await adminAddRecipePage.fillAddRecipeForm(exampleRecipe);
      await adminAddRecipePage.addRecipeButton.click();
      await expect(page).toHaveURL(`${baseURL}/admin/recipes`);

      const recipesPage = new RecipesPage(page);
      await recipesPage.openRecipeByName(exampleRecipe.name);

      const recipeDetailsPage = new RecipeDetailPage(page);
      await expect(recipeDetailsPage.recipeTitle).toHaveText(exampleRecipe.name);
    });

    test("admin can edit recipe details", async ({ page }) => {
      const adminPage = new AdminPage(page);
      await expect(adminPage.showRecipesButton).toBeVisible();
      await adminPage.showRecipesButton.click();
      await expect(page).toHaveURL(`${baseURL}/admin/recipes`);
      const recipesPage = new RecipesPage(page);
      await recipesPage.openRecipeByName(exampleRecipe.name);
      const recipeDetailsPage = new RecipeDetailPage(page);
      await expect(recipeDetailsPage.editRecipeButton).toBeVisible();
      await recipeDetailsPage.editRecipeButton.click();
      const editRecipePage = new EditRecipPage(page);

      await expect(editRecipePage.recipeNameInput).toBeVisible();
      await expect(editRecipePage.saveChangesButton).toBeVisible();
      await editRecipePage.recipeNameInput.fill(changedRecipeName);
      await editRecipePage.saveChangesButton.click();

      await expect(recipeDetailsPage.recipeName).toHaveText(changedRecipeName);
    });

    test("admin can delete recipe", async ({ page }) => {});
  });
});
