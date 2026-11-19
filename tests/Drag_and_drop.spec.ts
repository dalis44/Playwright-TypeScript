import { test, expect } from '@playwright/test';

test('Drag and Drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click();
  await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
  for (let i = 0; i < 20; i++) {await page.locator('#column-a').dragTo(page.locator('#column-b'));}

});