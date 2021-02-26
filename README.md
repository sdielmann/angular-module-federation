# Steffen's Angular Boilerplate Project

This project is based on [Angular CLI](https://github.com/angular/angular-cli) on version 11.2.2. The default CLI project setup has been adapted:

- Karma has been replaced by [jest](https://jestjs.io/) as the unit test runner
- Jasmine has been replace by [Cucumber](https://github.com/cucumber/cucumber-js) and [chai](https://www.chaijs.com/) in e2e tests
- tslint and Codelyzer have been replaced by [eslint](https://eslint.org/)
- Basic mock backend has been included based on [json-server](https://github.com/typicode/json-server)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also test the application from a different device (e.g. your smartphone) in the same network. In order to do so, you must serve the app with `ng serve --host 0.0.0.0` which will make it accessible from outside the localhost. You can access the app by opening your local IP address and port in the browser, e.g. `http://192.168.100.1:4200`.

The mocked backend can be used as a datasource for the application. It is started with `npm run backend-mock` and served on port 9080. The proxy.config.js of the Angular development server is already set up to use this backend.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `jest` to execute the unit tests via [jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
