import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";

export class SignInPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.emailInput = page.getByRole("textbox", { name: "Email:" });
    this.passwordInput = page.getByRole("textbox", { name: "Password:" });
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.errorMessage = page.locator('[class*="error-message"]');
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL!}/sign-in`);
  }

  async fillForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }
}
