import { test, expect } from '@playwright/test';

async function closeAdIfPresent(page) {
  // Iterate through all frames on the page
  for (const frame of page.frames()) {
    try {
      const closeButton = frame.getByRole('button', { name: /close|dismiss|skip|×/i });

      if (await closeButton.count() > 0) {
        await closeButton.first().click({ timeout: 2000 });
        console.log("Ad closed");
        return true;
      }
    } catch (e) {
      // Ignore errors from cross-origin frames
    }
  }

  return false;
}


test('text', async ({ page }) => {

  await page.goto('https://automationexercise.com/');

  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.count() > 0) {
    await consent.click();
  }

  await page.getByText(' API Testing',{exact: true}).click();
  await page.waitForTimeout(500); // wait for 1 second
  await page.goBack();
  //await page.waitForTimeout(500); 

  await page.getByText(' Test Cases',{exact:true}).first().click();
  await page.waitForTimeout(1000);
  await closeAdIfPresent(page);
  //await page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();

  await expect(page.locator('.col-sm-9.col-sm-offset-1').getByText('Test Cases')).toBeVisible();
  await page.waitForTimeout(2000); // wait for 1 second
  await page.goBack();
  await page.waitForTimeout(10000);
  //await page.waitForTimeout(500); 

  await page.getByText("Products",{exact:true}).click();
  await page.waitForTimeout(500); // wait for 1 second
  await page.goBack();
  await page.waitForTimeout(500); 



});