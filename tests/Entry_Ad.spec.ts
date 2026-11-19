import { test, expect } from '@playwright/test';
//------------

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
