import { test, expect, APIRequestContext } from "@playwright/test";

import path from "path";
import fs from "fs";

const URL = process.env.API_URL!;
const IMAGE_PATH = path.resolve(__dirname, "../../assets/avatar.png");

const recipeToEdit = {
  name: "API Test Recipe - Pancakes",
  ingredients: "flour, milk, eggs, sugar",
  instructions: "Mix all ingredients into a batter and fry on a hot pan until golden on both sides.",
  time: "20",
  category: "Breakfast",
  cuisine: "American",
  difficulty: "Easy",
  seasonality: "All Seasons",
  specialDiet: "None",
};

test.describe("PATCH", async () => {
  test.describe.configure({ mode: "serial" });
  let adminContext: APIRequestContext;
  let recipeId: string;

  test.beforeAll(async ({ playwright }) => {
    const loginContext = await playwright.request.newContext({ baseURL: URL });
    const signInResponse = await loginContext.post("/sign-in", {
      data: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
    });

    expect(signInResponse.status()).toBe(200);
    const { token } = await signInResponse.json();
    await loginContext.dispose();

    adminContext = await playwright.request.newContext({
      baseURL: URL,
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
  });

  test.afterAll(async () => {
    if (recipeId && adminContext) {
      await adminContext.delete(`/admin/recipes/${recipeId}`);
    }
  });

  test.beforeEach(async () => {
    const response = await adminContext.post("/admin/recipes/add-recipe", {
      multipart: {
        ...recipeToEdit,
        image: {
          name: "avatar.png",
          mimeType: "image/png",
          buffer: fs.readFileSync(IMAGE_PATH),
        },
      },
    });
    await test.step("response status is 201 Created", async () => {
      expect(response.status()).toBe(201);
    });

    const body = await response.json();

    await test.step("response contains the created recipe with correct data", async () => {
      expect(body.recipe).toMatchObject({
        name: recipeToEdit.name,
        instructions: recipeToEdit.instructions,
        time: Number(recipeToEdit.time),
        category: recipeToEdit.category,
        cuisine: recipeToEdit.cuisine,
        difficulty: recipeToEdit.difficulty,
      });
      expect(body.recipe.ingredients).toEqual(recipeToEdit.ingredients.split(",").map((i) => i.trim()));
    });

    recipeId = body.recipe._id ?? body.recipe.id;
  });

  test("admin can edit existing recipe's name", async () => {
    const response = adminContext.patch("/admin/recipes/add-recipe", {});
  });

  test("admin can edit existing recipe's ingredients", async () => {});
  test("admin can edit existing recipe's instructions", async () => {});
  test("admin can edit existing recipe's image", async () => {});
  test("admin can edit existing recipe's time", async () => {});
  test("admin can edit existing recipe's category", async () => {});
  test("admin can edit existing recipe's cuisine", async () => {});
  test("admin can edit existing recipe's difficulty", async () => {});
  test("admin can edit existing recipe's seasonality", async () => {});
  test("admin can edit existing recipe's specialDiet", async () => {});
});
