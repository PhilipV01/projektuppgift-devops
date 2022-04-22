const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 0;

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
     let loginModal= await $('.loginModal');
     //check ig we have a proper format for log-in modal
     // x button 
     //let closeLoginModal =await $('.closeLoginModal'); 
     //expect(loginModal.toHaveAttr(closeLoginModal));
     //input fields
     let input = await $('.modal input');
     //expect(loginModal.toHaveAttr(input));
     //email 
     //expect (input.toHaveAttr('input[name="email"]'));
     //password 
     //expect(input.toHaveAttr('input[name="password"]')); 
});

When(/^I enter my email "(.*)" in Email and "(.*)" in Password$/, async(email,password)=> {
    //let inputFiled = await $$('form [name="login"]');
    //await browser.pause(2000);
    //grab the email field 
    let emailField = await $('form[name="login"] input[name="email"]'); 

    //enter the email 
    //await emailField.click();
    await emailField.addValue(email);
    await browser.pause(2000);
    //grab the password field
    let passField = await $('form[name="login"] input[name="password"]');
    //enter the password 
    await passField.addValue(password);
    await browser.pause(2000); 

    
});

Then(/^I click login button and see "(.*)" so I know I'm logged in$/, async(status)=>{
    //await browser.elementSubmit('form[name="login"]'); 
    // grab the buyButton
    let logInButton = await $('button[name="submitLoginInfo"]');
    // click the buyButton
    await logInButton.click();
    //grab the logout button 
    // let logOutButton = await $('.logout');
    // await expect(logInButton).toHaveText(status);
    // pause before ending the step
    await browser.pause(20000);
});

