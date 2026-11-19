import {test , expect} from '@playwright/test';

test('Radio Buttons' , async ({ page }) =>
  {
     await page.goto('https://the-internet.herokuapp.com/');

     await page.getByRole('link', {name : 'Radio Buttons', exact : true}).click();

     await page.getByRole('heading',{name : "Radio Buttons"}).isVisible();

     await page.locator('fieldset').nth(0).isVisible();
     await page.getByRole('group',{name : "Favorite color"}).isVisible();

     await page.getByLabel('Blue').isVisible();
     await page.getByLabel('Blue').check();
     await expect(page.getByLabel('Blue')).toBeChecked();
     await expect(page.getByLabel('Red')).not.toBeChecked();
     await expect(page.getByLabel('Green')).not.toBeChecked();

     await page.getByLabel('Red').isVisible();
     await page.getByLabel('Red').check();
     await expect(page.getByLabel('Red')).toBeChecked();

     await page.getByLabel('Green').isVisible();
     await page.getByLabel('Green').check();
     await expect(page.getByLabel('Green')).toBeChecked();

     //--------------------------------------- Second field --------------------------------------------
     await page.waitForTimeout(1000); 
     await page.getByRole('group',{name : "Favorite pet"}).isVisible();

     // the radio is not properly labeled, its accessible name may be empty - solution below won't work
     //await page.getByRole('radio' , {name : ' Football'}).isVisible();
     //await page.getByRole('radio' , {name : ' Football'}).check();
     //await expect(page.getByRole('radio' , {name : ' Football'})).toBeChecked();
     //await expect(page.getByRole('radio' , {name : ' Tennis'})).not.toBeChecked();
     //await expect(page.getByRole('radio' , {name : ' Hockey'})).not.toBeChecked();

     await page.locator("input[value = 'football']").isVisible();
     await page.locator("input[value = 'football']").check();
     await page.waitForTimeout(1000);
     await page.locator("input[value = 'tennis']").isVisible();
     await page.locator("input[value = 'tennis']").check();
     await page.waitForTimeout(1000);
     await expect(page.locator("input[value = 'hockey']")).toBeDisabled();

     await expect(page.locator('#result')).toContainText('Color: green, Sport: tennis');
     
  });