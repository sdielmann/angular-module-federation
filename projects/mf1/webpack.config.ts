import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration, container } from 'webpack';
import * as path from 'path';

export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.output.uniqueName = 'contact';
  config.output.publicPath = 'http://localhost:4300/';
  config.optimization.runtimeChunk = false;

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: "mf1",
      filename: "mf1.js",
      exposes: {
        './Contact': path.resolve(__dirname, './src/app/contact/contact.module.ts'),
        './Clock': path.resolve(__dirname, './src/app/clock/clock.module.ts'),
      },
      shared: {
        '@angular/animations': {singleton: true, strictVersion: true},
        '@angular/core': {singleton: true, strictVersion: true},
        '@angular/common': {singleton: true, strictVersion: true},
        '@angular/forms': {singleton: true, strictVersion: true},
        '@angular/platform-browser': {singleton: true, strictVersion: true},
        '@angular/router': {singleton: true, strictVersion: true},
        rxjs: {singleton: true, strictVersion: true},
      }
    })
  );

  return config;
};