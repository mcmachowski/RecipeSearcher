# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/sign-up.spec.ts >> SignUp >> User can sign up
- Location: all_tests/e2e/sign-up.spec.ts:17:7

# Error details

```
Error: ENOENT: no such file or directory, stat '../../assets/avatar.png'
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e6]:
        - img "Logo Recipe Searcher" [ref=e7]
        - link "RecipeSearcher" [ref=e8] [cursor=pointer]:
          - /url: /
          - generic [ref=e9]: RecipeSearcher
      - navigation [ref=e10]:
        - link "Home" [ref=e11] [cursor=pointer]:
          - /url: /
          - img [ref=e12]
          - generic [ref=e14]: Home
        - link "Search" [ref=e15] [cursor=pointer]:
          - /url: /search
          - img [ref=e16]
          - generic [ref=e18]: Search
        - link "Recipes" [ref=e19] [cursor=pointer]:
          - /url: /recipes
          - img [ref=e20]
          - generic [ref=e22]: Recipes
        - link "Sign In" [ref=e23] [cursor=pointer]:
          - /url: /sign-in
          - img [ref=e24]
          - generic [ref=e26]: Sign In
        - link "Sign Up" [ref=e27] [cursor=pointer]:
          - /url: /sign-up
          - img [ref=e28]
          - generic [ref=e30]: Sign Up
  - generic [ref=e32]:
    - heading "Sign Up" [level=2] [ref=e33]
    - generic [ref=e34]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: "First Name:"
          - textbox "First Name:" [ref=e38]:
            - /placeholder: enter first name
            - text: TestFirstName
        - generic [ref=e39]:
          - generic [ref=e40]: "Last Name:"
          - textbox "Last Name:" [active] [ref=e41]:
            - /placeholder: enter last name
            - text: TestLastName
      - generic [ref=e42]:
        - generic [ref=e43]: "Image:"
        - generic [ref=e44]:
          - paragraph [ref=e46]: Please pick an image.
          - button "Pick Image" [ref=e47] [cursor=pointer]
          - paragraph
      - generic [ref=e48]:
        - generic [ref=e49]: "Email:"
        - textbox "Email:" [ref=e50]:
          - /placeholder: enter email
      - generic [ref=e51]:
        - generic [ref=e52]: "Password:"
        - textbox "Password:" [ref=e53]:
          - /placeholder: enter password
      - generic [ref=e54]:
        - generic [ref=e55]: "Confirm Password:"
        - textbox "Confirm Password:" [ref=e56]:
          - /placeholder: confirm password
      - button "Sign Up" [ref=e57] [cursor=pointer]
  - contentinfo [ref=e58]:
    - list [ref=e59]:
      - listitem [ref=e60]: RecipeSearcher 2026
      - listitem [ref=e61]: Marcel Ćmachowski
      - listitem [ref=e62]:
        - link "GitHub" [ref=e63] [cursor=pointer]:
          - /url: https://github.com/mcmachowski/RecipeSearcher
      - listitem [ref=e64]:
        - link "LinkedIn" [ref=e65] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/marcel-%C4%87machowski-7b3954233/
```

# Test source

```ts
  1  | import { Page, Locator, expect } from "@playwright/test";
  2  | import { Navbar } from "./Navbar";
  3  | import { SignUpData } from "../all_tests/types/SignUpData";
  4  | 
  5  | import path from "path";
  6  | 
  7  | export class SignUpPage {
  8  |   readonly page: Page;
  9  |   readonly navbar: Navbar;
  10 | 
  11 |   readonly firstNameInput: Locator;
  12 |   readonly lastNameInput: Locator;
  13 |   readonly imageField: Locator;
  14 |   readonly emailInput: Locator;
  15 |   readonly passwordInput: Locator;
  16 |   readonly confirmPasswordInput: Locator;
  17 |   readonly signUpButton: Locator;
  18 | 
  19 |   constructor(page: Page) {
  20 |     this.page = page;
  21 |     this.navbar = new Navbar(page);
  22 |     this.firstNameInput = page.getByRole("textbox", { name: "First Name:" });
  23 |     this.lastNameInput = page.getByRole("textbox", { name: "Last Name:" });
  24 |     this.imageField = page.locator('input[type="file"]');
  25 |     this.emailInput = page.getByRole("textbox", { name: "Email:" });
  26 |     this.passwordInput = page.getByRole("textbox", { name: "Password:", exact: true });
  27 |     this.confirmPasswordInput = page.getByRole("textbox", { name: "Confirm Password:" });
  28 |     this.signUpButton = page.getByRole("button", { name: "Sign Up" });
  29 |   }
  30 | 
  31 |   async fillForm(user: SignUpData) {
  32 |     await this.firstNameInput.fill(user.firstName);
  33 |     await this.lastNameInput.fill(user.lastName);
  34 | 
  35 |     if (user.imagePath) {
> 36 |       await this.imageField.setInputFiles(user.imagePath);
     |       ^ Error: ENOENT: no such file or directory, stat '../../assets/avatar.png'
  37 |     }
  38 | 
  39 |     await this.emailInput.fill(user.email);
  40 |     await this.passwordInput.fill(user.password);
  41 |     await this.confirmPasswordInput.fill(user.password);
  42 |   }
  43 | 
  44 |   async submit() {
  45 |     await this.signUpButton.click();
  46 |   }
  47 | }
  48 | 
```