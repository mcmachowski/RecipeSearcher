import { Page, Locator } from "@playwright/test";
import { Navbar } from "../Navbar";

export class AdminUsersListPage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly pageTitle: Locator;
  readonly userItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.pageTitle = page.getByRole("heading", { level: 1 });
    this.userItems = page.locator("ul > a");
  }

  private async getUserField(index: number, fieldIndex: number): Promise<string> {
    const text = await this.userItems.nth(index).locator("span").nth(fieldIndex).textContent();
    return text?.trim() ?? "";
  }

  async getUserName(index: number): Promise<string> {
    return this.getUserField(index, 0);
  }

  async getUserSurname(index: number): Promise<string> {
    return this.getUserField(index, 1);
  }

  async getUserEmail(index: number): Promise<string> {
    return this.getUserField(index, 2);
  }

  async getUserAccountType(index: number): Promise<string> {
    return this.getUserField(index, 3);
  }

  async getUsersCount(): Promise<number> {
    return await this.userItems.count();
  }

  async getUser(index: number) {
    const spans = this.userItems.nth(index).locator("span");

    return {
      name: (await spans.nth(0).textContent())?.trim() ?? "",
      surname: (await spans.nth(1).textContent())?.trim() ?? "",
      email: (await spans.nth(2).textContent())?.trim() ?? "",
      accountType: (await spans.nth(3).textContent())?.trim() ?? "",
    };
  }
}
