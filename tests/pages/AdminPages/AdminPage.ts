import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class AdminPage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly adminTitle: Locator;
  readonly showUsersButton: Locator;
  readonly showRecipesButton: Locator;
  readonly addNewRecipeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.adminTitle = page.getByRole("heading", { level: 1 });
    this.showUsersButton = page.getByRole("link", { name: "Show Users" });
    this.showRecipesButton = page.getByRole("link", { name: "Show Recipes" });
    this.addNewRecipeButton = page.getByRole("link", { name: "Add New Recipe" });
  }
}
