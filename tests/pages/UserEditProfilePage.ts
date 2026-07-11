import { Page, Locator } from "@playwright/test";

export class UserEditProfilePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Name:", exact: true });
    this.surnameInput = page.getByRole("textbox", { name: "Surname:" });
    this.emailInput = page.getByRole("textbox", { name: "Email:" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillSurname(surname: string) {
    await this.surnameInput.fill(surname);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
}
