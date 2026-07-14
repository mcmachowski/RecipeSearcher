# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin/admin.spec.ts >> Admin >> Recipe management >> admin can add recipe and see it in recipes list
- Location: all_tests/admin/admin.spec.ts:74:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Add Recipe:' })

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
        - link "Admin" [ref=e11] [cursor=pointer]:
          - /url: /admin
          - img [ref=e12]
          - generic [ref=e14]: Admin
        - link "Home" [ref=e15] [cursor=pointer]:
          - /url: /
          - img [ref=e16]
          - generic [ref=e18]: Home
        - link "Search" [ref=e19] [cursor=pointer]:
          - /url: /search
          - img [ref=e20]
          - generic [ref=e22]: Search
        - link "Recipes" [ref=e23] [cursor=pointer]:
          - /url: /recipes
          - img [ref=e24]
          - generic [ref=e26]: Recipes
        - link "Favorites" [ref=e27] [cursor=pointer]:
          - /url: /favorites/6a53aba2a4270d23cf4debe6
          - img [ref=e28]
          - generic [ref=e30]: Favorites
        - link "Profile" [ref=e31] [cursor=pointer]:
          - /url: /profile/6a53aba2a4270d23cf4debe6
          - img [ref=e32]
          - generic [ref=e34]: Profile
        - listitem [ref=e35] [cursor=pointer]:
          - img [ref=e36]
          - generic [ref=e38]: SignOut
  - generic [ref=e40]:
    - heading "Add New Recipe" [level=2] [ref=e41]
    - generic [ref=e42]:
      - generic [ref=e43]: "Name:"
      - textbox "Name:" [ref=e44]: exampleRecipeName
    - generic [ref=e45]:
      - generic [ref=e46]: "Ingredients:"
      - textbox "Ingredients:" [ref=e47]: test1
    - generic [ref=e48]:
      - generic [ref=e49]: "Instructions:"
      - textbox "Instructions:" [ref=e50]: Test this recipe.
    - generic [ref=e51]:
      - img "Preview" [ref=e53]
      - button "Pick Image" [ref=e54] [cursor=pointer]
    - generic [ref=e55]:
      - generic [ref=e56]: Time (minutes)
      - spinbutton "Time (minutes)" [ref=e57]: "10"
    - generic [ref=e58]:
      - generic [ref=e59]: "Category:"
      - textbox "Category:" [ref=e60]: Dinner
    - generic [ref=e61]:
      - generic [ref=e62]: "Cuisine:"
      - textbox "Cuisine:" [ref=e63]: Polish
    - generic [ref=e64]:
      - generic [ref=e65]: Difficulty
      - textbox "Difficulty" [ref=e66]: Easy
    - generic [ref=e67]:
      - generic [ref=e68]: Seasonality
      - textbox "Seasonality" [ref=e69]: All Seasons
    - generic [ref=e70]:
      - generic [ref=e71]: SpecialDiet
      - textbox "SpecialDiet" [active] [ref=e72]: None
    - button "Add Recipe" [ref=e73] [cursor=pointer]
  - contentinfo [ref=e74]:
    - list [ref=e75]:
      - listitem [ref=e76]: RecipeSearcher 2026
      - listitem [ref=e77]: Marcel Ćmachowski
      - listitem [ref=e78]:
        - link "GitHub" [ref=e79] [cursor=pointer]:
          - /url: https://github.com/mcmachowski/RecipeSearcher
      - listitem [ref=e80]:
        - link "LinkedIn" [ref=e81] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/marcel-%C4%87machowski-7b3954233/
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { HomePage } from "../../pages/HomePage";
  3  | import { AdminPage } from "../../pages/AdminPages/AdminPage";
  4  | import { AdminUsersListPage } from "../../pages/AdminPages/AdminUsersListPage";
  5  | import { AdminAddRecipePage } from "../../pages/AdminPages/AdminAddRecipePage";
  6  | import { RecipeData } from "../types/RecipeData";
  7  | import { RecipesPage } from "../../pages/RecipesPage";
  8  | import { RecipeDetailPage } from "../../pages/RecipeDetailPage";
  9  | 
  10 | const baseURL = process.env.BASE_URL!;
  11 | 
  12 | test.beforeEach(async ({ page }) => {
  13 |   const homePage = new HomePage(page);
  14 |   await homePage.open();
  15 |   await homePage.navbar.goToAdminPage();
  16 |   await expect(page).toHaveURL(`${baseURL}/admin`);
  17 | });
  18 | 
  19 | test.describe("Admin", () => {
  20 |   test("admin can see admin panel", async ({ page }) => {
  21 |     const adminPage = new AdminPage(page);
  22 |     await expect(adminPage.adminTitle).toBeVisible();
  23 |     await expect(adminPage.adminTitle).toHaveText("Admin Panel");
  24 |     await expect(adminPage.showRecipesButton).toBeVisible();
  25 |     await expect(adminPage.addNewRecipeButton).toBeVisible();
  26 |   });
  27 | 
  28 |   test("admin can see users on a list", async ({ page }) => {
  29 |     const adminPage = new AdminPage(page);
  30 | 
  31 |     await test.step("admin can see Admin Panel heading", async () => {
  32 |       await expect(adminPage.adminTitle).toBeVisible();
  33 |       await expect(adminPage.adminTitle).toHaveText("Admin Panel");
  34 |     });
  35 | 
  36 |     await adminPage.showUsersButton.click();
  37 |     const adminUsersListPage = new AdminUsersListPage(page);
  38 | 
  39 |     await test.step("admin can see users heading", async () => {
  40 |       await expect(adminUsersListPage.pageTitle).toBeVisible();
  41 |       await expect(adminUsersListPage.pageTitle).toHaveText("All Users");
  42 |     });
  43 | 
  44 |     await test.step("admin can see some users", async () => {
  45 |       await expect(adminUsersListPage.userItems.first()).toBeVisible();
  46 |       const usersCount = await adminUsersListPage.getUsersCount();
  47 |       expect(usersCount).toBeGreaterThan(0);
  48 |       for (let i = 0; i < usersCount; i++) {
  49 |         const user = await adminUsersListPage.getUser(i);
  50 | 
  51 |         expect(user.name).not.toBe("");
  52 |         expect(user.surname).not.toBe("");
  53 |         expect(user.email).toContain("@");
  54 |         expect(["User", "Admin"]).toContain(user.accountType);
  55 |       }
  56 |     });
  57 |   });
  58 | 
  59 |   test.describe("Recipe management", () => {
  60 |     test.describe.configure({ mode: "serial" });
  61 |     const exampleRecipe: RecipeData = {
  62 |       name: "exampleRecipeName",
  63 |       ingredients: "test1",
  64 |       instructions: "Test this recipe.",
  65 |       imagePath: "./assets/avatar.png",
  66 |       time: 10,
  67 |       category: "Dinner",
  68 |       cuisine: "Polish",
  69 |       difficulty: "Easy",
  70 |       seasonality: "All Seasons",
  71 |       specialDiet: "None",
  72 |     };
  73 | 
  74 |     test("admin can add recipe and see it in recipes list", async ({ page }) => {
  75 |       const adminPage = new AdminPage(page);
  76 |       await expect(adminPage.addNewRecipeButton).toBeVisible();
  77 |       await adminPage.addNewRecipeButton.click();
  78 |       const adminAddRecipePage = new AdminAddRecipePage(page);
  79 |       await expect(page).toHaveURL(`${baseURL}/admin/recipes/add-recipe`);
  80 | 
  81 |       await adminAddRecipePage.fillAddRecipeForm(exampleRecipe);
> 82 |       await adminAddRecipePage.addRecipeButton.click();
     |                                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  83 |       await expect(page).toHaveURL(`${baseURL}/admin/recipes`);
  84 | 
  85 |       const recipesPage = new RecipesPage(page);
  86 |       await recipesPage.openRecipeByName(exampleRecipe.name);
  87 | 
  88 |       const recipeDetailsPage = new RecipeDetailPage(page);
  89 |       await expect(recipeDetailsPage.recipeTitle).toHaveText(exampleRecipe.name);
  90 |     });
  91 | 
  92 |     test("admin can delete recipe", async ({ page }) => {});
  93 |   });
  94 | });
  95 | 
```