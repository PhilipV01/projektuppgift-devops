const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 5000;


Given('that I see the Login button', async()=>{
    await browser.url('/');
    
});

When('I click on log in buttuon',async()=>{  
    // grab the buyButton
    let logInButton = await $('.login');
    // click the buyButton
    await logInButton.click();
    
});

When('I see the login modal appeared and there are email and password fields to fill in',async()=>{
     //grab loginModal 
     let loginModal= await $('.loginModal').waitForDisplayed({timeout:5000});
    
});

When(/^I enter my email "(.*)" in Email and "(.*)" in Password$/, async(email,password)=> {
    await $('form[name="login"]').waitForEnabled({timeout:5000});
    //grab the email field 
    let emailField = await $('form[name="login"] input[name="email"]'); 
    //enter the email 
    await emailField.addValue(email);
    await browser.pause(pauseTime);
    //grab the password field
    let passField = await $('form[name="login"] input[name="password"]');
    await passField.addValue(password);
    await browser.pause(pauseTime); 

    
});

Then("I click login button and now I'm logged in", async()=>{ 
    // grab the buyButton
    let logInButton = await $('button[name="submitLoginInfo"]');
    // click the buyButton
    await logInButton.click();
    await browser.pause(pauseTime);
    
});

Then("I click logout button and I'm logged out now", async()=> {
    let logOutButton = await $('.logout');
    await logOutButton.waitForEnabled({timeout:5000});
    await logOutButton.click();
    await browser.pause(pauseTime);
    let loginButton = await $ ('.login')
    expect(loginButton).toHaveText("Login");
}) //