Feature: Log in as a registered user  
    As a user who has already registered,
    I should be able to log in with my email and password.

    Scenario: Clicking a log in button 
        Given that I see log in button 
        When I click on "Login" button
        And I see "loginModal" and "Email" and "Password" on the modal 
        And I enter my email "anna.larsson@gmail.com" in "Email"
        And I enter my password "12345678" in "Password"
        And I click on the log in button 
        Then I logged in and see log out button now 