import { test, expect } from '@playwright/test';

test('Floating menu stays visible on scroll', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/floating_menu');

  const menu = page.locator('#menu');

  // 1. Meniul este vizibil la început
  await expect(menu).toBeVisible();

  // 2. Scroll mare
  await page.evaluate(() => window.scrollTo(0, 1500));

  // 3. Meniul trebuie să fie vizibil și după scroll
  await expect(menu).toBeVisible();

  // 4. Verificăm că are position: fixed
  const position = await menu.evaluate(el => getComputedStyle(el).position);
  expect(position).toBe('fixed');

  // 5. Verificăm că link-ul "About" funcționează
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/#about/);
});



test('Floating menu stays visible on scroll 2', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/floating_menu');

  const menu = page.locator('#menu');

  // 1. Meniul este vizibil la început
  await expect(menu).toBeVisible();

  // 2. Scroll mare
  await page.evaluate(() => window.scrollTo(0, 1500));
  
  // 3. Meniul trebuie să fie vizibil și după scroll
  await expect(menu).toBeVisible();

  // 4. Verificăm că link-ul "About" funcționează
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/#about/);
  await page.waitForTimeout(1000); // Wait for 1 second

  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/#contact/);
  await page.waitForTimeout(1000); // Wait for 1 second

  await page.getByRole('link', { name: 'News' }).click();
  await expect(page).toHaveURL(/#news/);
  await page.waitForTimeout(1000); // Wait for 1 second

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL(/#home/);
});
