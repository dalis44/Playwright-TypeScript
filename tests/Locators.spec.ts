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

  await page.goto('https://the-internet.herokuapp.com/');

  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.count() > 0) {
    await consent.click();
  }

  await page.getByRole('link', { name: 'A/B Testing', exact: true }).click()
  await expect(page.getByText('Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).')).toBeVisible();  
  await page.waitForTimeout(500); // wait for 1 second
  await page.goBack();
  await page.waitForTimeout(500); 

  await page.getByRole('link', { name: 'Add/Remove Elements', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Add/Remove Elements' })).toBeVisible();

  for(let i=0; i<=10;i++){
    await page.getByRole('button', { name: 'Add Element', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Delete' }).nth(i)).toBeVisible();
  }
  await page.waitForTimeout(10000);

  for(let i=10; i>=0;i--){
    await page.getByRole('button', { name: 'Delete', exact: true }).nth(i).click()
    //await expect(page.getByRole('button', { name: 'Delete' }).nth(i)).toBeVisible();
  }
  await page.waitForTimeout(500);
  await page.goBack();

  await page.getByRole('link', { name: 'Broken Images', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Broken Images' })).toBeVisible();
  const brokenImages = await page.locator('img');
  const count = await brokenImages.count();
  
  for (let i = 0; i <  count; i++) {
    const image1 = brokenImages.nth(i);
    const checkit = 0
    const isBroken = await expect.poll(async () => 
      {const checkit = await image1.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);} 
    );
    if (checkit) {console.log(`Image ${i + 1} is not broken.`);}
  }

});




test('Image', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/');

  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.count() > 0) {
    await consent.click();
  }


  await page.getByRole('link', { name: 'Broken Images', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Broken Images' })).toBeVisible();
  const brokenImages = await page.locator('img');
  const count = await brokenImages.count();
  console.log(`Total images found: ${count}`);
  
  for (let i = 0; i <  count; i++) {
    const image1 = brokenImages.nth(i);
    
    await expect.poll(async () => 
      {return await image1.evaluate((img: HTMLImageElement) => 
        img.complete);

      }).toBe(true);
    
    const isBroken = await image1.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);  

    if (isBroken) {console.log(`Image ${i + 1} is not broken.`);}
    else {console.log('Image ${i + 1} is broken.');}

}}

);



test('Challenging DOM', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/');

  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.count() > 0) {
    await consent.click();
  }
  
  await page.getByRole('link', { name: 'Challenging DOM', exact: true }).click()
  const buttonsLoc =  page.locator('.button')
  const btnNr = await buttonsLoc.count()
  console.log(`Total buttons found: ${btnNr}`);
  await page.screenshot({ path: 'page1.png' });

  for(let i = 0; i < btnNr; i++){
    let n = 0
    while(n< 3){
    
    //const before = await buttonsLoc.nth(i).innerText();  
    await buttonsLoc.nth(i).click();
    await page.waitForTimeout(500);
    //const after = await buttonsLoc.nth(i).innerText();
    //expect(before).not.toBe(after);  innerText
     n=n+1;
    } }

  const rows = page.locator('tbody tr');
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    console.log(await rows.nth(i).innerText());
  }
  
  const links = page.locator('a[href^="#"]');

  for (let i = 0; i < await links.count(); i++) {
    await links.nth(i).click();
  }
  //---------------------------
  const before = await page.locator('tbody').innerHTML();
  await page.locator('a[href="#edit"]').nth(0).click();
  const after = await page.locator('tbody').innerHTML();
  console.log(`Before: ${before}`);
  console.log(`After: ${after}`);

  

});

test('Checkboxes', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/');

  const consent = page.getByRole('button', { name: 'Consent' });
  if (await consent.count() > 0) {
    await consent.click();
  }
  
  await page.getByRole('link', { name: 'Checkboxes', exact: true }).click()
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { name: 'Checkboxes', exact: true })).toBeVisible();
  await page.getByRole('checkbox').nth(0).check();
  await page.getByRole('checkbox').nth(1).uncheck();
  for(let i = 0; i < 10; i++){
    await page.getByRole('checkbox').nth(0).check();
    await page.getByRole('checkbox').nth(1).uncheck();
    await page.getByRole('checkbox').nth(0).uncheck();
    await page.getByRole('checkbox').nth(1).check();}


});


test('Context Menu', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Context Menu' }).click();
  page.once('dialog', async dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    //dialog.dismiss().catch(() => {});
    expect(dialog.message()).toBe('You selected a context menu');
    await page.waitForTimeout(1000);
    await dialog.accept();
  });
  await page.locator('#hot-spot').click({
    button: 'right'
  });
});


test('Context Menu 1', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Context Menu' }).click();
  page.once('dialog', async dialog =>{console.log(dialog.message());}
  )
  await page.locator('#hot-spot').click({
    button: 'right'
  });
});

test('Disappearing Elements', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Disappearing Elements' }).click();
  await expect(page.getByRole('heading', { name: 'Disappearing Elements' })).toBeVisible();
  let i = 0;
  while (i < 4) {
  await page.getByRole('link', { name: 'Home' }).hover();
  await page.getByRole('link', { name: 'About' }).hover();
  await page.getByRole('link', { name: 'Contact Us' }).hover();
  await page.getByRole('link', { name: 'Portfolio' }).hover();
  //await page.waitForTimeout(1000);
  //await page.getByRole('link', { name: 'Gallery' }).hover();
  i++;
}
  
  await page.locator('a[href = "//gallery"]').hover();
});

test('Disappearing Elements another', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Disappearing Elements' }).click();
  await expect(page.getByRole('heading', { name: 'Disappearing Elements' })).toBeVisible();
  const gallery = page.locator('a[href="/gallery/"]');
  if(await gallery.count()>0){
    await gallery.click();
  }
  else{console.log('Gallery link is not visible this time.');}
  await page.waitForTimeout(1000);
  //await page.locator('a[href="/gallery/"]').click();
});

test('Disappearing Elements complete', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Disappearing Elements' }).click();
  await expect(page.getByRole('heading', { name: 'Disappearing Elements' })).toBeVisible();
  const gallery = page.locator('a[href="/gallery/"]');
  for (let i = 0; i < 2; i++) {
      if (await gallery.count() > 0) {
    await gallery.click();
    console.log('This time was ok');
    page.goBack();
  } else {
    console.log('Gallery link is not visible this time.');
  }
  await page.waitForTimeout(1000);
  }

  for (let i = 0; i < 5; i++) {
      if (await gallery.count() > 0) {
    page.locator('a[href="/gallery/"]').hover();
    console.log('Hover ok');
    await page.reload();
  } else {
    console.log('Gallery link is not visible this time for hover.');
  }
  await page.waitForTimeout(1000);
  }


  //await page.locator('a[href="/gallery/"]').click();
});

