import { test, expect } from '@playwright/test';

test('Drag and Drop mouse move', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' , exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
  for (let i = 0; i < 20; i++) {
    await page.locator('#column-a').hover();
    await page.mouse.down();
    await page.locator('#column-b').hover();
    await page.mouse.up();
  
  }

});
