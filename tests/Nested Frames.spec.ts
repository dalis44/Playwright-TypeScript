import {test , expect} from '@playwright/test'

test('Frames' , async ({page}) => 
{
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link' , {name : 'Frames' , exact : true}).click();

  // Navigate to Nested Frames
  await page.getByRole('link', {name : "Nested Frames" , exact :true}).click();
  page.goBack();
  await page.locator('a[href = "/nested_frames"]').click();

  // Switch to the top frame that contains the left  right and middle frames
  const topFrame = page.frameLocator("frame[name = 'frame-top']");
  const leftframe = topFrame.frameLocator('frame[name = "frame-left"]');
  const middleFrame = topFrame.frameLocator("frame[name = 'frame-middle']");
  const rightFrame = topFrame.frameLocator("frame[name='frame-right']");

  const bottomFrame = page.frameLocator("frame[name='frame-bottom']");

  await expect(leftframe.getByText('LEFT')).toBeVisible();
  await expect(middleFrame.getByText('MIDDLE')).toBeVisible();
  await expect(rightFrame.getByText('RIGHT')).toBeVisible();
  await expect(bottomFrame.getByText('BOTTOM')).toBeVisible();

})




test('Frames _2' , async ({page}) => 
{
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link' , {name : 'Frames' , exact : true}).click();

  // Navigate to Nested Frames
  await page.getByRole('link', {name : "Nested Frames" , exact :true}).click();
  page.goBack();
  await page.locator('a[href = "/nested_frames"]').click();

  // Switch to the top frame that contains the left  right and middle frames
  const topFrame = page.frameLocator("frame[name = 'frame-top']");
  const leftframe = topFrame.frameLocator('frame[name = "frame-left"]');
  const middleFrame = topFrame.frameLocator("frame[name = 'frame-middle']");
  const rightFrame = topFrame.frameLocator("frame[name='frame-right']");

  const bottomFrame = page.frameLocator("frame[name='frame-bottom']");

  await expect(leftframe.locator('body')).toHaveText('LEFT');
  await expect(middleFrame.locator('body')).toHaveText('MIDDLE');
  await expect(rightFrame.locator('body')).toHaveText('RIGHT');
  await expect(bottomFrame.locator('body')).toHaveText('BOTTOM');

})