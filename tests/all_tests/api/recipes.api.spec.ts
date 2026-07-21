import { test, expect } from "@playwright/test";

test.describe("/recipes", async () => {
  const URL = process.env.API_URL!;
  const recipeId = "65b018190c74fee668e2b098";

  test.skip("GET - all recipes", async ({ request }) => {
    const response = await request.get(`${URL}/recipes`);
    const responseObject = await response.json();

    await test.step("response returns array of recipes", async () => {
      expect(responseObject).toBeTruthy();
      expect(Array.isArray(responseObject.recipes)).toBe(true);
    });

    await test.step("response's array has at least 1 recipe", async () => {
      expect(responseObject.recipes.length).toBeGreaterThan(0);
    });
  });

  test("GET - get recipe by id", async ({ request }) => {
    const response = await request.get(`${URL}/recipes`);
    const responseObject = await response.json();
    const recipeToFindById = await responseObject.recipes.find((recipe: any) => recipe._id === recipeId);

    await test.step("response gives recipe with given id", async () => {
      expect(recipeToFindById).toBeTruthy();
    });

    await test.step("fetching the same recipe directly by id - returns matching data", async () => {
      const singleRecipeResponse = await request.get(`${URL}/recipes/${recipeId}`);
      expect(singleRecipeResponse.status()).toBe(200);
      const recipeBody = await singleRecipeResponse.json();

      expect(recipeBody.recipe._id).toBe(recipeId);
      expect(recipeBody.recipe.name).toBe(recipeToFindById.name);
      expect(recipeBody.recipe.ingredients).toStrictEqual(recipeToFindById.ingredients);
      expect(recipeBody.recipe.instructions).toBe(recipeToFindById.instructions);
      expect(recipeBody.recipe.image).toBe(recipeToFindById.image);
      expect(recipeBody.recipe.users).toStrictEqual(recipeToFindById.users);
      expect(recipeBody.recipe.time).toBe(recipeToFindById.time);
      expect(recipeBody.recipe.category).toBe(recipeToFindById.category);
      expect(recipeBody.recipe.cuisine).toBe(recipeToFindById.cuisine);
      expect(recipeBody.recipe.difficulty).toBe(recipeToFindById.difficulty);
      expect(recipeBody.recipe.seasonality).toBe(recipeToFindById.seasonality);
      expect(recipeBody.recipe.specialDiet).toStrictEqual(recipeToFindById.specialDiet);
    });
  });
});
