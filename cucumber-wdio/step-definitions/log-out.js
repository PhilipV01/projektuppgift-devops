const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 1000;

Given (/^I am logged in as a registered customer as "(.*)"$/, async(email)=>{
    // logging in first 
    await browser.url('/');
    let logInButton = await $('.login');
    await logInButton.click();
    let loginModal= await $('.loginModal');
    let emailField = await $('form[name="login"] input[name="email"]'); 
    await emailField.addValue(email);
    await browser.pause(pauseTime);
    //grab the password field
    let passField = await $('form[name="login"] input[name="password"]');
    //enter the password 
    await passField.addValue("12345678");
    await browser.pause(pauseTime); 
    //check 
    let buttonDisplayed = await $('.logout');
    let status = "Logout "+email
    expect(buttonDisplayed).toHaveText(status);

})
When ('I click on logout button', async()=>{
    let logOutButton = await $('.logout');
    await logOutButton.click();
});

Then('I should be successfully logged out and see loging button again',async()=>{
    let buttonCamesBack = await $('.login');
    expect(buttonCamesBack).toHaveText("Login")

});