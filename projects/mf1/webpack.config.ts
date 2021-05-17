import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration, container } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import * as path from 'path';

export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {

  config.output.uniqueName = 'contact';
  config.optimization.runtimeChunk = false;

  const hashMfModule = options.outputHashing === 'all' || options.outputHashing === 'bundles';

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: "mf1",
      filename: `mf1${hashMfModule ? '.[contenthash]' : ''}.js`,
      exposes: {
        './Contact': path.resolve(__dirname, './src/app/contact/contact.module.ts'),
        './Clock': path.resolve(__dirname, './src/app/clock/index.ts'),
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

  // Create a manifest.json file that links default file names to their hashed names
  config.plugins.push(new WebpackManifestPlugin({
    filter: (file) => /mf1(\..+)?.js$/.test(file.name),
    publicPath: '/mf1/',
    writeFilesToEmit: true
  }));

  return config;
};
