import { After, AfterAll, BeforeAll, Status } from '@cucumber/cucumber';
import { browser } from 'protractor';

BeforeAll(() => {

})

After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = Buffer.from(await browser.takeScreenshot(), 'base64');
    this.attach(screenshot, 'image/png');
  }
});

AfterAll({timeout: 100 * 1000}, async () => {
  await browser.quit();
});
