import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://mcmachowski-recipe-searcher.netlify.app/');
  
  const recipeButton = page.getByRole('link', { name: 'Recipes', exact: true });

  await recipeButton.click();

  await expect(page).toHaveURL('https://mcmachowski-recipe-searcher.netlify.app/recipes');
});
