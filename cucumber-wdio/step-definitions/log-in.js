const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 0;

Given('that I see log in button', async()=>{
    await browser.url('/');
});
//log in button "login "
When ('I click on the log in button', async () => {
        // grab the buyButton
        let logInButton = await $('.login');
        // click the buyButton
        await logInButton.click();
      });
And ('I see log in modal', async() =>{
     await $('.loginModal modal');

    });

And(/^I enter my email "(.*)" in "(.*)"$/, async(email, field)=> {
    let email = "anna.larsson@gmail.com";
    let field = await $('.email');

});


And (/^I enter my password "*" in ".*"$/, async()=>{
    let password = "12345678";
    let field = await $('.password');
    
});

And('I click on the login button ')

      
Then(/^(\d*) item of "(.*)" should be added to the cart$/, async (quantity, productName) => {
        // get all the table cells in the first row of the table
        // that is the shoppingList/cart
        let tds = await $$('.shoppingCart tr:first-child td');
        // check that we have the expected content in the cart
        await expect(tds[0]).toHaveText(quantity);
        await expect(tds[1]).toHaveText(productName);
        // mostly for humans - scroll to the shopping cart
        await tds[0].scrollIntoView();
        // pause before ending the step
        await browser.pause(pauseTime);
      });    



Then I logged in and see log out button now