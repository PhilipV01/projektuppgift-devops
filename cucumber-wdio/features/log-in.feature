Feature: Log in as a registered user  
    As a user who has already registered,
    I should be able to log in with my email and password.

    Scenario: Clicking a log in button 
        Given that I see the Login button 
        When I click on the "Login" button
        And I see the login modal and email" and password on it 
        And I enter my email "anna.larsson@gmail.com" in Email
        And I enter my password "12345678" in Password
        And I click on "login" button 
        Then I logged in and see "logout anna.larsson@gmail.com" button now 