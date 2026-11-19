import { test, expect } from '@playwright/test';

test('Dynamic Controls', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.locator("a[href='/dynamic_controls']").click();
  //await expect(page.locator(".subheader")).toHaveText("Remove/add");
  await expect(page.locator(".subheader").nth(0)).toHaveText("Remove/add");

  for (let i =0 ;i<5;i++){
    if(await page.locator("input[type='checkbox']").isVisible()){  
      page.locator("input[type='checkbox']").check();
  await page.waitForTimeout(1000);
  await page.locator("input[type='checkbox']").uncheck();}
}    

  page.goBack();
  await page.waitForTimeout(1000);
  await page.locator("a[href='/dynamic_controls']").click();
  await expect( page.getByRole('heading', { name: 'Dynamic Controls', exact: true })).toBeVisible();
  await expect(page.locator(".subheader").nth(0)).toHaveText("Remove/add");
  await page.waitForTimeout(1000);
  for (let i = 0; i < 5; i++) {
  await page.waitForSelector("input[type='checkbox']", { state: "attached" });
  const checkbox = page.locator("input[type='checkbox']");
  await checkbox.check();
  await page.waitForTimeout(500);
  await checkbox.uncheck();}

  await page.getByRole('button', { name: 'Remove' }).click();
  await page.waitForSelector("input[type = 'checkbox']" , {state : 'detached'});
  await expect(page.locator('#checkbox-example input[type = "checkbox"]')).toBeHidden();
  //await expect(page.locator('#message')).toBeVisible();
  await expect(page.locator('#checkbox-example p[id = "message"]')).toHaveText("It's gone!");
  await page.waitForTimeout(1000);
  await page.getByRole('button',{name:'Add'}).click();
  await page.waitForSelector("input[type = 'checkbox']" , {state : 'attached'});
  await expect(page.locator('#checkbox-example input[type = "checkbox"]')).toBeVisible();
  await expect(page.locator('#checkbox-example p[id = "message"]')).toHaveText("It's back!");
  
  for (let i = 0; i < 5; i++) {const checkbox = page.locator("input[type='checkbox']");
  await checkbox.check();
  await page.waitForTimeout(500);
  await checkbox.uncheck();}
  await page.locator('#checkbox-example p[id = "message"]').getAttribute('id');
  console.log(await page.locator('#checkbox-example p[id = "message"]').getAttribute('id'));
  //await expect(page.locator('#checkbox-example p[id = "message"]').toHaveText("It's back!")).toBeVisible();
 //await page.getByRole('button', { name: 'Add' }).click();

});


test('Dynamic Controls Enable', async ({ page }) => {
  test.setTimeout(200000);
  await page.goto('https://the-internet.herokuapp.com/');
  await page.locator("a[href='/dynamic_controls']").click();
  //await expect(page.locator(".subheader")).toHaveText("Remove/add");
  await expect(page.locator(".subheader").nth(1)).toHaveText("Enable/disable");

  const input = page.locator("#input-example input[type='text']");
  const message = page.locator('#input-example p[id = "message"]');

  await expect(input).toBeDisabled();

   
  const butn = page.getByRole('button', { name: 'Enable' });
  await butn.click();
  await page.waitForTimeout(200);
  await expect(input).toBeEnabled();
  await expect(page.locator('#input-example p[id = "message"]')).toHaveText("It's enabled!");
  
  const butnD = page.getByRole('button', { name: 'Disable' });
  await butnD.click();
  await page.waitForTimeout(200);
  await expect(input).toBeDisabled();
  await expect(page.locator('#input-example p[id = "message"]')).toHaveText("It's disabled!");
  page.goBack();
  await page.locator("a[href='/dynamic_controls']").click();
  for(let i = 0; i < 10; i++){
    const butn = page.getByRole('button', { name: 'Enable' });
  await butn.click();
  await expect(input).toBeEnabled();
  await expect(page.locator('#input-example p[id = "message"]')).toHaveText("It's enabled!");

  const butnD = page.getByRole('button', { name: 'Disable' });
  await butnD.click();
  await expect(input).toBeDisabled();
  await expect(page.locator('#input-example p[id = "message"]')).toHaveText("It's disabled!");

  }
  
});
