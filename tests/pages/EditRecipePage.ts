import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class EditRecipPage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly recipeNameInput: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.recipeNameInput = page.getByRole("textbox", { name: "Name:" });
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
  }
}
