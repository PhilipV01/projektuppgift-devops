const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 1000;

Given ('that I see a list of products',async()=>{
    await browser.url('/');

});

When(/^I choose and click a product name "(.*)"$/, async (product) => {
   let headlines = await $$('.productInList h3');
   for(let headline of headlines){
       let text = await headline.getText();
       if(text.trim() === "Tuna - Yellowfin"){
           await headline.scrollIntoView();
           await headline.click()
           break
       }
   }
  });

When ('I see the product name, its detail information and price', async()=>{
    let name = await $('.product h3');
    await expect(name).toHaveText("Tuna - Yellowfin");
    let detail = await $('.product div');
    await expect(detail).toHaveTextContaining('Lorem ipsum dolor sit amet');
    let price = await $('.price');
    await expect(price).toHaveText('Price: 61 kr');
})

Then (/^I click "(.*)" button$/, async(button)=>{
    let backButton = await $('.backButton');
    //await expect (backButton).toHaveStyle(button);
    await backButton.click();

});


Then ('I am back to the product list', async()=>{
    //expect(browser.url('/'));
    // CHECK THAAT productList is back
});