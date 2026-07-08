import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";

export class SearchPage {
  readonly page: Page;
  readonly navbar: Navbar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
  }
}
