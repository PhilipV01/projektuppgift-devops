const {Given,When,Then} = require('@wdio/cucumber-framework');
const pauseTime = 0;

Given('that I see the Login button', async()=>{
    await browser.url('/');
    
});

When (/^I click on "(.*)" button$/, async(login) => {
        // grab the buyButton
        let logInButton = await $('.login');
        await button.toHaveText(login) 
        // click the buyButton
        await logInButton.click();
      });

And ('I see the login modal and email and password on it', async(email,password) =>{
    //grab loginModal 
    let loginModal= await $('.loginModal');
    
    let closeLoginModal =await $('.closeLoginModal');
    await expect(loginModal).toHaveAttr(closeLoginModal);

    let input = await $('.modal input');
    await expect(loginModal).toHaveAttr(input);
    await expect (input).toHaveAttr('input[name="email"]');
    await expect (input).toHaveAttr('input[name="password"]');
    /*let emailField= await $('Email');
    await expect(loginModal).toHaveAttr(emailField);

    let passwordField= await $('Password');
    await expect(loginModal).toHaveAttr(passwordField);*/
    });

And(/^I enter my email "(.*)" in Email$/, async(email)=> {
     //grab the email field 
    let field = await $('input[name="email"]');
    //enter the email 
    await field.setValue(email);
    
       
});


And (/^I enter my password "*" in Password$/, async(password)=>{
    //grab the password field
    let field = await $('input[name="password"]');
    //enter the password 
    await field.setValue(password);
    
  
    
});

And('I click on the login button ', async()=>{
    // grab the buyButton
    let logInButton = await $('.login');
    // click the buyButton
    await logInButton.click();
});

      
Then ('I logged in and see log out button now', async () => {
        //grab the logout button 
        let button = await $('.logout');
        await expect(button).toHaveText('Logout '+email);
        // pause before ending the step
        await browser.pause(pauseTime);
      });    

