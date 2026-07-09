import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";

export class RecipesPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly pageTitle: Locator;
  readonly recipeNameHeadings: Locator;
  readonly recipeDetailsLinks: Locator;
  readonly nextPageButton: Locator;
  readonly previousPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.pageTitle = page.getByRole("heading", { level: 2 });
    this.recipeNameHeadings = page.getByRole("heading", { level: 3 });
    this.recipeDetailsLinks = page.getByRole("link", { name: "See more details" });
    this.nextPageButton = page.getByRole("link", { name: "Next", exact: true });
    this.previousPageButton = page.getByRole("link", { name: "Previous", exact: true });
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

}
