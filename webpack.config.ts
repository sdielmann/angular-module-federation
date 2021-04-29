import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration, container } from 'webpack';


export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.output.uniqueName = 'shell';
  // config.output.publicPath = 'http://localhost:4200';
  config.optimization.runtimeChunk = false;

  config.plugins.push(
    new container.ModuleFederationPlugin({
      remotes: {
        'contact': "contact@http://localhost:4300/contact.js"
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
