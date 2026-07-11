import { Page, Locator } from "@playwright/test";

export class Navbar {
  readonly page: Page;
  readonly navHomeButton: Locator;
  readonly navLogoButton: Locator;
  readonly navSearchButton: Locator;
  readonly navRecipesButton: Locator;
  readonly navSignInButton: Locator;
  readonly navSignUpButton: Locator;

  // logged user locator
  readonly navProfileButton: Locator;
  readonly navSignOutButton: Locator;
  readonly navFavoritesButton: Locator;

  // admin locators
  readonly navAdminButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHomeButton = page.getByRole("link", { name: "Home", exact: true });
    this.navLogoButton = page.getByRole("link", { name: "RecipeSearcher", exact: true });
    this.navSearchButton = page.getByRole("link", { name: "Search", exact: true });
    this.navRecipesButton = page.getByRole("link", { name: "Recipes", exact: true });
    this.navSignInButton = page.getByRole("link", { name: "Sign In", exact: true });
    this.navSignUpButton = page.getByRole("link", { name: "Sign Up", exact: true });

    // logged user navigation buttons
    this.navProfileButton = page.getByRole("link", { name: "Profile", exact: true });
    this.navFavoritesButton = page.getByRole("link", { name: "Favorites", exact: true });
    this.navSignOutButton = page.getByRole("listitem").filter({ hasText: "SignOut" });

    // admin user navigation buttons
    this.navAdminButton = page.getByRole("link", { name: "Admin", exact: true });
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

  async goToProfilePage() {
    await this.navProfileButton.click();
  }
}
