import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class SearchPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly addFiltersButton: Locator;
  readonly voiceButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.searchInput = page.getByPlaceholder("Search");
    this.searchButton = page.locator('[class*="buttons"]').getByRole("link", { name: "Search", exact: true });
    this.addFiltersButton = page.getByRole("button", { name: "Add Filters" });
    this.voiceButton = page.getByRole("button", { name: "Voice" });
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL!}/search`);
  }

  async searchForRecipe(recipe?: string) {
    if (recipe) {
      await this.searchInput.fill(recipe);
    }
    await this.searchButton.click();
  }
}
