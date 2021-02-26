import { Given, When, Then } from '@cucumber/cucumber';
import { browser, By, element, ExpectedConditions } from 'protractor';

Given(/^I navigate to "(.*?)"$/, async (url: string) => {
  await browser.get(url);
})

When(/^I click on "([^"]*)"$/, async (text: string) => {
  await element(By.linkText(text)).click()
});

Then(/^I should be at "(.*?)"$/, async (url: string) => {
  browser.wait(ExpectedConditions.urlIs(url), 10000);
});
