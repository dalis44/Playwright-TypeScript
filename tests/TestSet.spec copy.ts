import { test, expect } from '@playwright/test';

test('Drag and Drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' }).click();
  await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
  for (let i = 0; i < 20; i++) {await page.locator('#column-a').dragTo(page.locator('#column-b'));}

});

test('Drag and Drop mouse move', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Drag and Drop' , exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Drag and Drop' })).toBeVisible();
  for (let i = 0; i < 20; i++) {
    await page.locator('#column-a').hover();
    await page.mouse.down();
    await page.locator('#column-b').hover();
    await page.mouse.up();
  
  }

});

test('Dropdown List', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();
  await page.waitForTimeout(1000);  

  await page.selectOption('#dropdown', '1');
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('1');

  await page.selectOption('#dropdown', { label: 'Option 2' });
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('2');

  await page.selectOption('#dropdown', { index: 1 });
  await page.waitForTimeout(1000);
  await expect(page.locator('#dropdown')).toHaveValue('1');

  await page.selectOption('#dropdown', { index: 2 });
  await expect(page.locator('#dropdown')).toHaveValue('2');

  page.goBack();
  await page.waitForTimeout(1000);
  //await page.browser_select_option('#dropdown', '1');


});


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

//------------
import { test, expect, Page } from '@playwright/test';

test('Entry Ad', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.getByRole('link', {
    name: 'Entry Ad',
    exact: true,
  }).click();

  // Close modal
  await page.locator('.modal .modal-footer p').click();

  // Re-enable modal
  await page.getByRole('link', {
    name: 'click here',
    exact: true,
  }).click();

  // Close modal again
  await page.locator('.modal .modal-footer p').click();

  // Assertions
  await expect(
    page.getByRole('heading', { name: 'Entry Ad' })
  ).toBeVisible();

  await expect(
    page.locator('.large-12.columns .example p').nth(0)
  ).toHaveText('Displays an ad on page load.');

  await expect(
    page.locator('.large-12.columns .example p').nth(1)
  ).toHaveText(
    'If closed, it will not appear on subsequent page loads.'
  );

  await expect(
    page.locator('.large-12.columns .example p').nth(2)
  ).toContainText('To re-enable it,');
});

async function trackMouse(
  page: Page,
  x: number,
  y: number
): Promise<void> {
  await page.mouse.move(x, y);

  console.log(`Mouse moved to: X=${x}, Y=${y}`);

  await page.evaluate(
    ({ x, y }) => {
      const win = window as any;

      if (win.__updateCursor) {
        win.__updateCursor(x, y);
      }
    },
    { x, y }
  );
}
//----------


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

test('Download File', async ({ page }) => {
  
    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForTimeout(1000);
    await page.locator("a[href = '/download']").click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByText('sample-1mb-test-file.dat').click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('D:\\AWORK\\Playwright\\' + download.suggestedFilename());

    page.goBack();
    await page.waitForTimeout(1000);
    const links = await page.locator('a').all();
    console.log(links.length);


    for (const link of links){
      console.log(link); 

      const Downloadpromise = await page.waitForEvent('download');
      await link.click();

    }
  
});


