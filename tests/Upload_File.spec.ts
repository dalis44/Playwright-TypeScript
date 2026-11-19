import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'File Upload' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('D:\\AWORK\\Playwright\\hello.txt');
  await page.getByRole('button', { name: 'Upload' }).click();
});

test('Test Upload', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/' , { waitUntil : 'domcontentloaded'});
  await page.getByRole('link', { name: 'File Upload' }).click();
  const fileName = 'hello.txt';
  await page.getByRole('button', {'name' : 'Choose File' }).setInputFiles('D:\\AWORK\\Playwright\\hello.txt');
  await page.getByRole('button' , {'name' : "Upload"}).click();
  await expect(page.getByRole('heading', {'name': 'File Uploaded!'})).toBeVisible();
  await expect(page.locator("#uploaded-files")).toHaveText(fileName);  

});
