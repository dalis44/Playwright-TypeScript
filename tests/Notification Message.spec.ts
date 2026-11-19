import {test , expect} from '@playwright/test'

test('Notification message' , async ({page}) => 
{
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link' , {name : 'Notification Messages' , exact : true}).click();

  await page.getByRole('heading' , {name :'Notification Message'}).isVisible();
  await expect(page.getByText("The message displayed above the heading is a notification message. It is often used"+ 
                               " to convey information about an action previously taken by the user.")).toBeVisible();
  
  await page.getByText("The message displayed above the heading is a notification message. It is often used"+ 
                               " to convey information about an action previously taken by the user.").isVisible();
                          
                         
  const message = new Set<string>();

  for(let i =0; i<30;i++)
    {
      await page.getByRole('link', {name : 'Click here'}).click();

      const text = await page.locator('#flash').textContent();
      
      let text_trimmed;
      if(text != null){
      text_trimmed =  text.replace('×' , '').trim();
      //console.log(text_trimmed);
      message.add(text_trimmed);}
      

    }
    //console.log('This is message : ',message);

    for (let i of message){
      if((i == 'Action successful') || (i == 'Action unsuccesful, please try again')) {
        console.log('Action successful is present');
        expect(message).toContain(i);
      
}}
})


