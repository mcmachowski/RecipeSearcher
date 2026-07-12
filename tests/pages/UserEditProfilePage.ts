import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class UserEditProfilePage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly nameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);

    this.nameInput = page.getByRole("textbox", { name: "Name:" });
    this.surnameInput = page.getByRole("textbox", { name: "Surname:" });
    this.emailInput = page.getByRole("textbox", { name: "Email:" });
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
  }

  async fillUsername(name: string) {
    await this.nameInput.fill(name);
  }

  async fillSurname(surname: string) {
    await this.surnameInput.fill(surname);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
}
