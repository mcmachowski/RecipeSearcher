import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class RecipeDetailPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly recipeTitle: Locator;
  readonly ingredientsHeading: Locator;
  readonly instructionsHeading: Locator;
  readonly recipeCategory: Locator;
  readonly recipeName: Locator;
  readonly addToFavButton: Locator;
  readonly removeFromFavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.recipeName = page.getByRole("heading", { level: 1 });
    this.addToFavButton = page.getByRole("button", { name: "Add to Favorites" });
    this.removeFromFavButton = page.getByRole("button", { name: "Remove from Favorites" });

    this.recipeTitle = page.getByRole("heading", { level: 1 });
    this.ingredientsHeading = page.getByRole("heading", {
      name: "Ingredients:",
    });
    this.instructionsHeading = page.getByRole("heading", {
      name: "Instructions:",
    });

    this.recipeCategory = page.locator("p").filter({
      hasText: /^Category:/,
    });
  }

  async getRecipeCategory(): Promise<string> {
    const text = await this.recipeCategory.textContent();
    return text!.replace("Category:", "").trim();
  }
}
