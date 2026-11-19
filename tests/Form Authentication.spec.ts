import {test , expect} from '@playwright/test'

test('Form Authentication' , async ({page}) => 
  {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', {'name' : "Form Authentication"}).click();

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button' , { name: ' Login' }).click();
    await page.locator("#flash").allTextContents().then((messages) => {
      const message = messages.join(' ');
      expect(message).toContain('You logged into a secure area!');
    });
    await page.getByRole('link' , { name: 'Logout' }).click();
    await page.locator("#flash").allTextContents().then((messages) => {
      const message = messages.join(' ');
      expect(message).toContain('You logged out of the secure area!');
    }); 
    //await expect(page.locator("#content")).toHaveText('Your e-mail\'s been sent!');
    //tohaveText('Your e-mail\'s been sent!');
  }
)

test('Form Authentication second' , async ({page}) => 
  {
    await page.goto('https://the-internet.herokuapp.com/')
    await page.getByRole('link', {'name' : "Form Authentication"}).click();

    await page.getByText('Login Page').isVisible();
    await page.getByText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.').isVisible();
    await page.locator("input[name = 'username']").fill('tomsmith');
    await page.locator("input[name = 'password']").fill('SuperSecretPassword!');
    
    await page.locator(".radius").click();
    await page.locator("#flash").allTextContents().then((messages) => {
      const message = messages.join(' ');
      expect(message).toContain('You logged into a secure area!');
    });

    const message = await page.locator("#flash").textContent();
    expect(message).toContain('You logged into a secure area!');

    //await page.locator('Secure Area').isVisible();
    await expect(page.getByRole('heading' , {name : 'Secure Area'}).nth(0)).toBeVisible();
    await page.getByText('Welcome to the Secure Area. When you are done click logout below.').isVisible();


    // Logout and verify the logout message
    await page.getByRole('link' , { name: 'Logout' }).click();
    await page.locator("#flash").allTextContents().then((messages) => {
      const message = messages.join(' ');
      expect(message).toContain('You logged out of the secure area!');
    }); 
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();

    await expect(page.locator("input[name = 'username']")).toBeVisible();
    await expect(page.locator("input[name = 'password']")).toBeVisible();
    await expect(page.getByRole('button' , { name: ' Login' })).toBeVisible();

    await expect(page.getByText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.')).toBeVisible();

    

  }
)