import {test} from '@playwright/test'
 
test('Evaluate fct', async ({page}) =>{
const PrimiteveResult = await page.evaluate(num =>num, 42);
console.log('PrimiteveResult:', PrimiteveResult); // Output: 42

const arrayRes = await page.evaluate(array => array , [1,2,3]);
console.log('This is array' , arrayRes)

const obj =await page.evaluate(obj => obj.foo, {foo:'bar'});
console.log('This is obj' , (obj));
})