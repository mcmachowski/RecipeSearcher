import { Page, Locator, expect } from "@playwright/test";

export class Navbar {
  readonly page: Page;
  readonly navAdminButton: Locator;
  readonly navHomeButton: Locator;
  readonly navLogoButton: Locator;
  readonly navSearchButton: Locator;
  readonly navRecipesButton: Locator;
  readonly navSignInButton: Locator;
  readonly navSignUpButton: Locator;
  readonly navSignOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navAdminButton = page.getByRole("link", { name: "Admin", exact: true });
    this.navHomeButton = page.getByRole("link", { name: "Home", exact: true });
    this.navLogoButton = page.getByRole("link", { name: "RecipeSearcher", exact: true });
    this.navSearchButton = page.getByRole("link", { name: "Search", exact: true });
    this.navRecipesButton = page.getByRole("link", { name: "Recipes", exact: true });
    this.navSignInButton = page.getByRole("link", { name: "Sign In", exact: true });
    this.navSignUpButton = page.getByRole("link", { name: "Sign Up", exact: true });
    this.navSignOutButton = page.getByRole("listitem").filter({ hasText: "SignOut" });
  }

  async goToAdminPage() {
    await this.navAdminButton.click();
  }

  async goToHomePageByLogo() {
    await this.navLogoButton.click();
  }

  async goToHomePageByHomeButton() {
    await this.navHomeButton.click();
  }

  async goToSearchPage() {
    await this.navSearchButton.click();
  }

  async goToRecipesPage() {
    await this.navRecipesButton.click();
  }

  async goToSignInPage() {
    await this.navSignInButton.click();
  }

  async goToSignUpPage() {
    await this.navSignUpButton.click();
  }
}
