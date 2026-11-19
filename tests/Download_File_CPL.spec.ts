import { test, expect } from '@playwright/test';

test('Download all', async ({ page }) => {

  // Navighează direct la pagina de download
  await page.goto('https://demoqa.com/login', {
    waitUntil: 'domcontentloaded'
  });

  // Selectează DOAR linkurile care duc la fișiere
  
});
