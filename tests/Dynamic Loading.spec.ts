import { test, expect } from '@playwright/test';


test('Dynamic Loading', async ({ page }) => {
  //test.setTimeout(200000);
  await page.goto('https://the-internet.herokuapp.com/');
  await page.locator("a[href='/dynamic_loading']").click();
  await expect(page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' })).toBeVisible();
  await expect(page.getByText("It's common to see an action get triggered that returns a result dynamically. It does not rely on the page to reload or finish loading. The page automatically gets updated (e.g. hiding elements, showing elements, updating copy, etc) through the use of JavaScript.")).toBeVisible();
  await expect(page.getByText("There are two examples. One in which an element already exists on the page but it is not displayed. And anonther where the element is not on the page and gets added in.")).toBeVisible();

  await page.getByRole('link', {name : "Example 1: Element on page that is hidden"}).click();
  page.goBack();
  await page.locator("a[href = '/dynamic_loading/1']").click();

  await page.getByRole('button' , {name : "Start"}).click();

  await expect(page.locator("#content .example h3")).toHaveText("Dynamically Loaded Page Elements");
  await expect(page.locator("#content .example h4").nth(0)).toHaveText("Example 1: Element on page that is hidden");
  await expect(page.locator("#content .example h4").nth(1)).toHaveText("Hello World!");
  page.goBack();
  await page.locator("a[href = '/dynamic_loading/2']").click();
  page.goBack();
  await page.getByRole('link', {name : "Example 2: Element rendered after the fact"}).click();
  //await expect(page.locator("#content .large-12.columns .example h3")).toHaveText("Dynamically Loaded Page Elements");
  await expect(page.locator(".large-12.columns .example h3")).toHaveText("Dynamically Loaded Page Elements");
  await expect(page.locator(".large-12.columns .example h4")).toHaveText("Example 2: Element rendered after the fact");
  await page.getByText("Dynamically Loaded Page Elements"); // alternative 
  await page.getByText("Example 2: Element rendered after the fact");
  await page.getByRole('button' , {name : 'Start'}).click();
  await page.getByText('Hello World!');



});
