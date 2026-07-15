import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";

export class RecipesPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly pageTitle: Locator;
  readonly recipeNameHeadings: Locator;
  readonly recipeDetailsLinks: Locator;
  readonly recipeItem: Locator;
  readonly previousPageButton: Locator;
  readonly recipesNavigationNextPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.pageTitle = page.getByRole("heading", { level: 2 });
    this.recipeNameHeadings = page.getByRole("heading", { level: 3 });
    this.recipeDetailsLinks = page.getByRole("link", { name: "See more details" });
    this.previousPageButton = page.getByRole("link", { name: "Previous", exact: true });
    this.recipeItem = page.locator('[class^="RecipeItem_recipe__"]');
    this.previousPageButton = page.getByRole("link", { name: "Previous", exact: true });
    this.recipesNavigationNextPage = page.getByRole("button", { name: "Next page" });
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL!}/recipes`);
  }

  async getTotalRecipesCount(): Promise<number> {
    const text = await this.pageTitle.textContent();
    const match = text?.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getFirstRecipeName(): Promise<string> {
    console.log();
    return (await this.recipeNameHeadings.first().textContent()) ?? "";
  }

  async goToRecipeDetailPageByIndex(index: number): Promise<void> {
    await this.recipeDetailsLinks.nth(index).click();
  }

  async openRecipeByName(recipeName: string): Promise<void> {
    while (true) {
      const count = await this.recipeItem.count();

      for (let i = 0; i < count; i++) {
        const recipe = this.recipeItem.nth(i);

        const currentName = (await recipe.getByRole("heading", { level: 3 }).textContent())?.trim() ?? "";

        if (currentName === recipeName) {
          await recipe.getByRole("link", { name: "See more details" }).click();
          return;
        }
      }

      if (!(await this.recipesNavigationNextPage.isEnabled())) {
        break;
      }

      await this.recipesNavigationNextPage.click();
    }

    throw new Error(`Recipe "${recipeName}" was not found.`);
  }
}
