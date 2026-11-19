import {test , expect} from '@playwright/test'

test('Forgot password' , async ({page}) => 
  {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.locator(' a[href = "/forgot_password"]  ').click();

    await page.getByLabel('E-mail').fill('test@example.com');
    await page.getByRole('button' , { name: 'Retrieve password' }).click();
    await expect(page.locator("#content")).toHaveText('Your e-mail\'s been sent!');
    //tohaveText('Your e-mail\'s been sent!');

  }
)