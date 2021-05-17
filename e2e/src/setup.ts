import { After, AfterAll, BeforeAll, Status } from '@cucumber/cucumber';
import { browser } from 'protractor';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

BeforeAll(() => {
  chai.use(chaiAsPromised);
})

After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    // screenShot is a base-64 encoded PNG
    const screenShot = await browser.takeScreenshot();
    this.attach(screenShot, "image/png");
  }
});

AfterAll({timeout: 100 * 1000}, async () => {
  await browser.quit();
});
