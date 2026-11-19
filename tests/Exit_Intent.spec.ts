import { test, expect } from '@playwright/test';
//------------

test('Exit Intent', async ({ page }) => {
  //test.setTimeout(200000);  
  await page.goto('https://the-internet.herokuapp.com/');
  //await page.locator("a[href='/entry_ad']").click();
  //page.goBack()
await page.mouse.move(200, 200);
 // Move toward the top edge, then outside the viewport. 
await page.mouse.move(200, 200);
await page.mouse.move(200, -1, { steps: 10 });
  
});

test('exit intent modal appears', async ({ page }) => { 
await page.goto('https://the-internet.herokuapp.com/exit_intent'); 
// Give Ouibounce's setTimeout(..., 0) time to attach its listener. 
await page.waitForTimeout(50); 
await page.evaluate(() => { document.documentElement.dispatchEvent( 
  new MouseEvent('mouseleave', 
    { bubbles: false, 
      cancelable: true, 
      clientY: 0, 
      relatedTarget: null, }) 
    ); 
  }); 
await expect(page.locator('#ouibounce-modal')).toBeVisible(); 
await expect( page.locator('#ouibounce-modal h3') ).toHaveText('This is a modal window'); });
