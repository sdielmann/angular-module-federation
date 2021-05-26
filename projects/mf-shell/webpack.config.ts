import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration, container } from 'webpack';
import { dependencies } from '../../package.json';


export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.output.uniqueName = 'shell';
  config.optimization.runtimeChunk = false;

  config.plugins.push(
    new container.ModuleFederationPlugin({
      remotes: {
        mf1: 'mf1@http://localhost:4300/mf1.js'
      },
      shared: {
        '@angular/animations': {singleton: true, strictVersion: true},
        '@angular/core': {singleton: true, strictVersion: true},
        '@angular/common': {singleton: true, strictVersion: true, requiredVersion: dependencies['@angular/common'] },
        '@angular/forms': {singleton: true, strictVersion: true},
        '@angular/platform-browser': {singleton: true, strictVersion: true},
        '@angular/router': {singleton: true, strictVersion: true},
        rxjs: {singleton: true, strictVersion: true},
      }
    })
  );

  return config;
};
