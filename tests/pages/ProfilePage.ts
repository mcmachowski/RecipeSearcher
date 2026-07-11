import { Page, Locator } from "@playwright/test";
import { Navbar } from "./Navbar";

export class ProfilePage {
  readonly page: Page;
  readonly navbar: Navbar;

  readonly title: Locator;
  readonly editProfileButton: Locator;
  readonly deleteProfileButton: Locator;
  readonly avatarImage: Locator;

  readonly userIdValue: Locator;
  readonly nameValue: Locator;
  readonly surnameValue: Locator;
  readonly emailValue: Locator;
  readonly favoritesCountValue: Locator;

  readonly deleteConfirmModal: Locator;
  readonly deleteConfirmButton: Locator;
  readonly deleteCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);

    this.title = page.getByRole("heading", { name: "Profile", exact: true });
    this.editProfileButton = page.getByRole("link", { name: "Edit Profile" });
    this.deleteProfileButton = page.getByRole("button", { name: "Delete Profile" });
    this.avatarImage = page.locator('img[class*="user-avatar"]');

    this.userIdValue = this.detailValueByLabel("User id:");
    this.nameValue = this.detailValueByLabel("Name:");
    this.surnameValue = this.detailValueByLabel("Surname:");
    this.emailValue = this.detailValueByLabel("Email:");
    this.favoritesCountValue = this.detailValueByLabel("Favorites:");

    this.deleteConfirmModal = page.locator('[class*="modal-content"]');
    this.deleteConfirmButton = page.getByRole("button", { name: "Confirm" });
    this.deleteCancelButton = page.getByRole("button", { name: "Close" });
  }

  private detailValueByLabel(labelText: string): Locator {
    return this.page
      .locator('[class*="user-detail"]')
      .filter({ has: this.page.getByText(labelText, { exact: true }) })
      .locator('[class*="user-description"]');
  }

  async clickDeleteProfile() {
    await this.deleteProfileButton.click();
  }

  async confirmDelete() {
    await this.deleteConfirmButton.click();
  }

  async cancelDelete() {
    await this.deleteCancelButton.click();
  }
}
