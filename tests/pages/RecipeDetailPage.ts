import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class RecipeDetailPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly recipeTitle: Locator;
  readonly ingredientsHeading: Locator;
  readonly instructionsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.recipeTitle = page.getByRole("heading", { level: 1 });
    this.ingredientsHeading = page.getByRole("heading", { name: "Ingredients:" });
    this.instructionsHeading = page.getByRole("heading", { name: "Instructions:" });
  }
}
