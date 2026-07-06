import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";
import { SignUpData } from "../all_tests/types/SignUpData";

import path from "path";

export class SignUpPage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly imageField: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.firstNameInput = page.getByRole("textbox", { name: "First Name:" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name:" });
    this.imageField = page.locator('input[type="file"]');
    this.emailInput = page.getByRole("textbox", { name: "Email:" });
    this.passwordInput = page.getByRole("textbox", { name: "Password:", exact: true });
    this.confirmPasswordInput = page.getByRole("textbox", { name: "Confirm Password:" });
    this.signUpButton = page.getByRole("button", { name: "Sign Up" });
  }

  async fillForm(user: SignUpData) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);

    if (user.imagePath) {
      const imagePath = path.resolve(user.imagePath);
      await this.imageField.setInputFiles(imagePath);
    }

    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
  }

  async submit() {
    await this.signUpButton.click();
  }
}
