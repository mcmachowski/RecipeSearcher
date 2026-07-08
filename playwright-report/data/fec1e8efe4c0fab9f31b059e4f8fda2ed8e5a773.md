# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/recipes.spec.ts >> Recipes >> user can navigate between recipe pages
- Location: all_tests/e2e/recipes.spec.ts:32:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: /Recipes\(\d+\)/ })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "Page not found" [level=1] [ref=e4]
  - paragraph [ref=e5]: Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site.
  - separator [ref=e6]
  - paragraph [ref=e7]:
    - text: If this is your site, and you weren’t expecting a 404 for this path, please visit Netlify’s
    - link "“page not found” support guide" [ref=e8] [cursor=pointer]:
      - /url: https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking
    - text: for troubleshooting tips.
```

# Test source

```ts
  1  | import { Page, Locator, expect } from "@playwright/test";
  2  | import { Navbar } from "./Navbar";
  3  | 
  4  | export class RecipesPage {
  5  |   readonly page: Page;
  6  |   readonly navbar: Navbar;
  7  | 
  8  |   readonly title: Locator;
  9  |   readonly recipeNameHeadings: Locator;
  10 |   readonly recipeDetailsLinks: Locator;
  11 |   readonly nextPageButton: Locator;
  12 |   readonly previousPageButton: Locator;
  13 | 
  14 |   constructor(page: Page) {
  15 |     this.page = page;
  16 |     this.navbar = new Navbar(page);
  17 |     this.title = page.getByRole("heading", { name: /Recipes\(\d+\)/ });
  18 |     this.recipeNameHeadings = page.getByRole("heading", { level: 3 });
  19 |     this.recipeDetailsLinks = page.getByRole("link", { name: "See more details" });
  20 |     this.nextPageButton = page.getByRole("link", { name: "Next", exact: true });
  21 |     this.previousPageButton = page.getByRole("link", { name: "Previous", exact: true });
  22 |   }
  23 | 
  24 |   async open() {
  25 |     await this.page.goto(`${process.env.BASE_URL!}/recipes`);
  26 |   }
  27 | 
  28 |   async getTotalRecipesCount(): Promise<number> {
> 29 |     const text = await this.title.textContent();
     |                                   ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  30 |     const match = text?.match(/\((\d+)\)/);
  31 |     return match ? parseInt(match[1], 10) : 0;
  32 |   }
  33 | 
  34 |   async getFirstRecipeName(): Promise<string> {
  35 |     return (await this.recipeNameHeadings.first().textContent()) ?? "";
  36 |   }
  37 | }
  38 | 
```