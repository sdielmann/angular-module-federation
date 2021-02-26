// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const path = require('path');
const fs = require('fs');
const tsNode = require('ts-node');

const reportDir = path.resolve(__dirname, 'report');
const timestamp = new Date()
  .toISOString()
  .replace(/T/, '_')
  .replace(/:/g, '-')
  .replace(/\..+/, '')

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  specs: ['features/**/*.feature'],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      'src/setup.ts',
      'src/steps/**/*.ts'
    ],
    'require-module': "ts-node/register",
    format: [
      '@cucumber/pretty-formatter',
      `html:${reportDir}/report_${timestamp}.html`
    ]
  },
  allScriptsTimeout: 11000,
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  onPrepare() {
    tsNode.register({
      project: path.join(__dirname, './tsconfig.json')
    });

    if (!fs.existsSync(reportDir)){
      fs.mkdirSync(reportDir, {recursive: true});
    }
  }
};
