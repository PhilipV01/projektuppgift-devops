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
    //grab loginModal 
    let loginModal= await $('.loginModal modal');
    
    let closeLoginModal =await $('.closeLoginModal');
    await expect(loginModal).toHaveAttr(closeLoginModal);

    let input = await $('.modal input');
    await expect(loginModal).toHaveAttr(input);
    await expect (input).toHaveAttr('type="email"');
    await expect (input).toHaveAttr('type="password"');
    /*let emailField= await $('Email');
    await expect(loginModal).toHaveAttr(emailField);

    let passwordField= await $('Password');
    await expect(loginModal).toHaveAttr(passwordField);*/
    });

And(/^I enter my email "(.*)" in "(.*)"$/, async(email,field)=> {
    
    let email = "anna.larsson@gmail.com"
     //grab the email field 
    let field = await $('type="email"');
    //enter the email 
    await field.setValue(email);
    
       
});


And (/^I enter my password "*" in ".*"$/, async(password, field)=>{
    let password = "12345678";
    //grab the password field
    let field = await $('type="password"');
    //enter the password 
    await field.setValue(password);
    
  
    
});

And('I click on the login button ', async()=>{
    // grab the buyButton
    let logInButton = await $('.login');
    // click the buyButton
    await logInButton.click();
});

      
Then ('I logged in and see log out button now', async (email, productName) => {
        //grab the logout button 
        let button = await $('.logout');
        await expect(button).toHaveText('Logout '+email);
        // pause before ending the step
        await browser.pause(pauseTime);
      });    

