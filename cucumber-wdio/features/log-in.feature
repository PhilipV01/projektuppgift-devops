Feature: Log in as a registered user  
    As a user who has already registered,
    I should be able to log in with my email and password.

    Background: I am on grocery shop page 
        Given that I see the Login button

    Scenario: Open log-in page and log in with entering my email and password
        When I click on log in buttuon
        And I see the login modal appeared and there are email and password fields to fill in
        And  I enter my email "anna.larsson@gmail.com" in Email and "12345678" in Password
        Then I click login button and see "logout anna.larsson@gmail.com" so I know I'm logged in