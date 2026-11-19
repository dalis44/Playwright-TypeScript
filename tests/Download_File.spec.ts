import { test, expect } from '@playwright/test';


test('Download File', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://the-internet.herokuapp.com/', {
  waitUntil: 'domcontentloaded'});
  await page.waitForTimeout(1000);
  await page.locator("a[href='/download']").click();
  await page.waitForTimeout(1000);
  //await page.goto('https://the-internet.herokuapp.com/');



// Selectăm toate linkurile de fișiere
  const fileLinks = await page.locator('#content a').all();

  // Descărcăm fiecare fișier
  for (const link of fileLinks) {
    const downloadPromise = page.waitForEvent('download');
    await page.waitForTimeout(1000);
    await link.click();
    await page.waitForTimeout(1000);
    const download = await downloadPromise;
    await page.waitForTimeout(1000);

    await download.saveAs(
      'D:\\AWORK\\Playwright\\' + download.suggestedFilename()
    );

    console.log('Downloaded:', download.suggestedFilename());
  }


  
});


test('Download File dynamic', async ({ page }) => {

  test.setTimeout(200000);

  await page.goto('https://the-internet.herokuapp.com/', {
    waitUntil: 'domcontentloaded'
  });

  await expect(page.locator("a[href='/download']")).toBeVisible();
  await page.locator("a[href='/download']").click();

  await page.waitForLoadState('networkidle');

  const fileLinks = await page.locator('#content a').all();
  let k = 0;

  for (const link of fileLinks) {
    if(k<50){
       k++
    await page.waitForTimeout(300);
    await expect(link).toBeVisible();

    // Sărim peste fișierul problematic
    if (await link.getByText('upload-pentest-z"onmouseover="window.xssproof=1337;q.txt').count() > 0) {
      console.log("Skipping problematic file...");
      continue;
    }

    try {
      // Așteaptă evenimentul de download
      await page.waitForTimeout(500);
      const downloadPromise = page.waitForEvent('download');

      // Click pe link
      await link.click();

      // Așteaptă finalizarea download-ului
      const download = await downloadPromise;

      // Salvează fișierul
      await download.saveAs(
        'D:\\AWORK\\Playwright\\Download\\' + download.suggestedFilename()
      );

      console.log('Downloaded:', download.suggestedFilename());

    } catch (error) {
      console.log(" Error downloading file:", await link.textContent());
      console.log("Reason:", error);
      // continuă bucla fără să oprească testul
      continue;
    }
    console.log('This is the value of k: {k} ', k);
  }}
});
