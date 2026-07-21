import { test, expect, APIRequestContext } from "@playwright/test";
import path from "path";
import fs from "fs";

const URL = process.env.API_URL!;
const IMAGE_PATH = path.resolve(__dirname, "../../assets/pancakes.jpg");

const newRecipeData = {
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

test.describe("POST", async () => {
  let adminContext: APIRequestContext;
  let createdRecipeId: string;

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
    if (createdRecipeId && adminContext) {
      await adminContext.delete(`/admin/recipes/${createdRecipeId}`);
    }
    await adminContext?.dispose();
  });

  test.only("admin should can add a new recipe", async ({ request }) => {
    const response = await adminContext.post("/admin/recipes/add-recipe", {
      multipart: {
        ...newRecipeData,
        image: {
          name: "avatar.jpg",
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
        name: newRecipeData.name,
        instructions: newRecipeData.instructions,
        time: Number(newRecipeData.time),
        category: newRecipeData.category,
        cuisine: newRecipeData.cuisine,
        difficulty: newRecipeData.difficulty,
      });
      expect(body.recipe.ingredients).toEqual(newRecipeData.ingredients.split(",").map((i) => i.trim()));
    });

    createdRecipeId = body.recipe._id ?? body.recipe.id;
  });

  test.only("newly created recipe is retrievable via GET /recipes/:id", async ({ request }) => {
    test.skip(!createdRecipeId, "Recipe was not created in the previous test");

    const response = await request.get(`${URL}/recipes/${createdRecipeId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.recipe.name).toBe(newRecipeData.name);
  });

  // test("should not add recipe without name", async ({ request }) => {});
  // test("should not add recipe without ingredients", async ({ request }) => {});
  // test("should not add recipe without instructions", async ({ request }) => {});
});
