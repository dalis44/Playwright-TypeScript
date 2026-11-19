import { test, expect } from '@playwright/test';

test('Dynamic Content', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dynamic Content', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dynamic Content' })).toBeVisible();
  await page.waitForTimeout(1000);  

  await expect(page.locator('.large-10.columns').nth(0)).not.toBeNull();
  const content1 = await page.locator('.large-10.columns').nth(0).textContent();
  //await page.reload();
  await expect(page.locator('.large-10.columns').nth(1)).not.toBeNull();
  const content2 = await page.locator('.large-10.columns').nth(1).textContent();

  await expect(page.locator('.large-10.columns').nth(2)).not.toBeNull();
  const content3 = await page.locator('.large-10.columns').nth(2).textContent();

  const image1 =  await page.locator('.large-2.columns img').nth(0).getAttribute('src');
  const image2 =  await page.locator('.large-2.columns img').nth(1).getAttribute('src');
  const image3 =  await page.locator('.large-2.columns img').nth(2).getAttribute('src');
  //await expect(page.locator('.large-10.columns')).toHaveCount(3);
  const firstImg = await page.locator('img').first().getAttribute('src');
  for (let i=0; i<10; i++){
  await page.reload();
  await page.waitForTimeout(500);
 }

  await expect(page.locator('.large-10.columns').nth(0)).not.toBeNull();
  const content11 = await page.locator('.large-10.columns').nth(0).textContent();
  //await page.reload();
  await expect(page.locator('.large-10.columns').nth(1)).not.toBeNull();
  const content22 = await page.locator('.large-10.columns').nth(1).textContent();

  await expect(page.locator('.large-10.columns').nth(2)).not.toBeNull();
  const content33 = await page.locator('.large-10.columns').nth(2).textContent();

  const image11 =  await page.locator('.large-2.columns img').nth(0).getAttribute('src');
  const image22 =  await page.locator('.large-2.columns img').nth(1).getAttribute('src');
  const image33 =  await page.locator('.large-2.columns img').nth(2).getAttribute('src');

  expect(image1).not.toBe(image11);
  expect(image2).not.toBe(image22);
  expect(image3).not.toBe(image33);


});