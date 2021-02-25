module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/testing/jest-setup.ts'],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/e2e/",
    "/testing/"
  ],
  transform: {
    "^.+\\.svg$": 'ts-jest'
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(svg|html)$",
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer'
        ]
      },
      diagnostics: {
        "warnOnly": true
      }
    }
  }
}
