const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 1000;

Given ('I am logged in as a registered customer', async()=>{
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
    await passField.addValue(password);
    await browser.pause(pauseTime); 

})
When ('I click on logout button' )
Then('I should be successfully logged out and see loging button again')