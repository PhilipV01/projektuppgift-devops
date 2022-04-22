Feature: Registered customer log out 
    As a user, I should be able to log out whenever I want 
    by simply clicking logout button. 

  Background: I am on grocery shop page  
    Given I am logged in as a registered customer as "anna.larsson@gmail.com"

    Scenario: Click the log out button and I'm be able to log out 
        When I click on logout button 
        Then I should be successfully logged out and see loging button again