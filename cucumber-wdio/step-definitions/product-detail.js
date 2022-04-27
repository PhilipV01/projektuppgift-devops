const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 1000;

Given ('that I see a list of products',async()=>{
    await browser.url('/');

});

When(/^I choose and click a product name "(.*)"$/, async (productName) => {
   let productName = await $('.productInList h3');
   expect(productName).toHaveText("Tuna - Yellowfin");
   await productName.click();
  });

When ('I see the product name, its detail information and price', async()=>{
    let name = await $('.product h3');
    expect(name).toHaveText("Tuna - Yellowfin");
    let detail = await $('.product div');
    expect(detail).toHaveTextContaining('Lorem ipsum dolor sit amet');
    let price = await $('.price');
    expect(price).toHaveText('Price: 61 kr');
});

Then (/^I click "(.*)" button$/, async()=>{
    let backButton = $('.backButton');
    await backButton.click();

});


Then ('I am back to the product list', async()=>{
    expect(browser.url('/'));
});