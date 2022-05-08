Feature: See a product detail page 
    As a user I should be able to jump to a product information page 
    by clicking the product name and go back to the list. 

    Background: I am on grocery shop page
        Given that I see a list of products

    Scenario: Jump to a detail infomation by click the product name and go back to the list again.
        When I choose and click a product name "Pastry - Plain Baked Croissant"
        And I see the product name, its detail information and price 
        Then I click "Back to product list" button 
        And I am back to the product list 


