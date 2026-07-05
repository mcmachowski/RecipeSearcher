import { Page, Locator, expect } from "@playwright/test";
import { Navbar } from "./Navbar";

export class HomePage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly h1title: Locator;
  readonly h2subtitle: Locator;
  readonly homeParagraph: Locator;
  readonly startButton: Locator;
  readonly h3subtitle: Locator;
  readonly h3normalText: Locator;
  readonly h3_2nd_subtitle: Locator;
  readonly h3_2nd_normalText: Locator;
  readonly lastParagraph: Locator;
  readonly joinNowButton: Locator;
  readonly image1: Locator;
  readonly image2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.h1title = page.getByRole("heading", { name: "RecipeSearcher" }).locator("span");
    this.h2subtitle = page.getByRole("heading", { name: "Discover a world of delicious" });
    this.homeParagraph = page.getByText("Welcome to the world of");
    this.startButton = page.getByRole("link", { name: "Start Exploring" });
    this.h3subtitle = page.getByRole("heading", { name: "Extensive Recipe Database" });
    this.h3normalText = page.getByText("Browse through a vast");
    this.h3_2nd_subtitle = page.getByRole("heading", { name: "Save Your Favorites" });
    this.h3_2nd_normalText = page.getByText("Save your favorite recipes to");
    this.lastParagraph = page.getByText("Ready to embark on a culinary");
    this.joinNowButton = page.getByRole("link", { name: "Join Now" });
    this.image1 = page.getByRole("img", { name: "Feature 1" });
    this.image2 = page.getByRole("img", { name: "Feature 2" });
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL!}`);
  }
}
