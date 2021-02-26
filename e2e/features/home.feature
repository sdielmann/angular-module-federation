#features/test.feature
Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  In order to run my E2E tests

  Scenario: Protractor and Cucumber Test
    Given I navigate to "http://localhost:4200"
    When I click on "CLI Documentation"
    Then I should be at "https://angular.io/cli"
