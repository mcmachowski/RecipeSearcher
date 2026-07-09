import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";
import { Filters } from "../all_tests/types/Filters";

export class SearchPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly addFiltersButton: Locator;
  readonly voiceButton: Locator;
  readonly closeFiltersPanelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.searchInput = page.getByPlaceholder("Search");
    this.searchButton = page.locator('[class*="buttons"]').getByRole("link", { name: "Search", exact: true });
    this.addFiltersButton = page.getByRole("button", { name: "Add Filters" });
    this.voiceButton = page.getByRole("button", { name: "Voice" });
    this.closeFiltersPanelButton = page.locator("#root div").filter({ hasText: "Add Filterstime (minutes)" }).locator("svg");
  }

  private getFilterButton(name: string): Locator {
    return this.page.getByRole("button", { name, exact: true });
  }

  private getFilterItem(name: string): Locator {
    return this.page.getByRole("listitem").filter({
      hasText: new RegExp(`^${name}$`),
    });
  }

  async searchForRecipe(recipe?: string) {
    if (recipe) {
      await this.searchInput.fill(recipe);
    }
    await this.searchButton.click();
  }

  async chooseFilters(filters: Filters) {
    await this.addFiltersButton.click();

    for (const filter of Object.values(filters)) {
      if (filter) {
        await this.getFilterButton(filter).click();
      }
    }
    await this.closeFiltersPanelButton.click();
  }

  async areChoosenFiltersVisible(filters: Filters): Promise<boolean> {
    for (const value of Object.values(filters)) {
      if (value && !(await this.getFilterItem(value).isVisible())) {
        return false;
      }
    }
    return true;
  }

  async 

}
