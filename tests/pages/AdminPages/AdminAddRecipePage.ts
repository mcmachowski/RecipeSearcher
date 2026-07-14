import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";
import { RecipeData } from "../../all_tests/types/RecipeData";

import path from "path";

export class AdminAddRecipePage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly recipeNameInput: Locator;
  readonly recipeIngredientsInput: Locator;
  readonly recipeInstructionsInput: Locator;
  readonly imageField: Locator;
  readonly recipeTimeInput: Locator;
  readonly recipeCategoryInput: Locator;
  readonly recipeCuisineInput: Locator;
  readonly recipeDifficultyInput: Locator;
  readonly recipeSeasonalityInput: Locator;
  readonly recipeSpecialDietInput: Locator;
  readonly addRecipeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.recipeNameInput = page.getByRole("textbox", { name: "Name:" });
    this.recipeIngredientsInput = page.getByRole("textbox", { name: "Ingredients:" });
    this.recipeInstructionsInput = page.getByRole("textbox", { name: "Instructions:" });
    this.imageField = page.locator('input[type="file"]');
    this.recipeTimeInput = page.getByRole("spinbutton", { name: "Time (minutes)" });
    this.recipeCategoryInput = page.getByRole("textbox", { name: "Category:" });
    this.recipeCuisineInput = page.getByRole("textbox", { name: "Cuisine:" });
    this.recipeDifficultyInput = page.getByRole("textbox", { name: "Difficulty:" });
    this.recipeSeasonalityInput = page.getByRole("textbox", { name: "Seasonality:" });
    this.recipeSpecialDietInput = page.getByRole("textbox", { name: "SpecialDiet:" });
    this.addRecipeButton = page.getByRole("button", { name: "Add Recipe:" });
  }

  async fillAddRecipeForm(recipe: RecipeData) {
    await this.recipeNameInput.fill(recipe.name);
    await this.recipeIngredientsInput.fill(recipe.ingredients);
    await this.recipeInstructionsInput.fill(recipe.instructions);

    if (recipe.imagePath) {
      const imagePath = path.resolve(recipe.imagePath);
      await this.imageField.setInputFiles(imagePath);
    }
    await this.recipeTimeInput.fill(recipe.time.toString());
    await this.recipeCategoryInput.fill(recipe.category);
    await this.recipeCuisineInput.fill(recipe.cuisine);
    await this.recipeDifficultyInput.fill(recipe.difficulty);
    await this.recipeSeasonalityInput.fill(recipe.seasonality);
    await this.recipeSpecialDietInput.fill(recipe.specialDiet);
  }
}
