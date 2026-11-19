import { test, expect } from '@playwright/test';

test('Dropdown List', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();
  await page.waitForTimeout(1000);  

  await page.selectOption('#dropdown', '1');
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('1');

  await page.selectOption('#dropdown', { label: 'Option 2' });
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('2');

  await page.selectOption('#dropdown', { index: 1 });
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('1');

  await page.selectOption('#dropdown', { index: 2 });
  await expect(page.locator('#dropdown')).toHaveValue('2');

  page.goBack();
  await page.waitForTimeout(1000);
  //await page.browser_select_option('#dropdown', '1');


});