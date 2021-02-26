module.exports = {
  root: true,
  ignorePatterns: [
    'e2e/**/*',
    'projects/**/*'
  ],
  overrides: [
    {
      files: [
        '*.ts'
      ],
      parserOptions: {
        project: [
          'tsconfig.json'
        ],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates'
      ],
      rules: {
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            style: 'camelCase'
          }
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'public-instance-field',
              'public-static-field',
              'protected-instance-field',
              'protected-static-field',
              'private-instance-field',
              'private-static-field',
              'public-constructor',
              'private-constructor',
              'public-instance-method',
              'public-static-method',
              'protected-instance-method',
              'protected-static-method',
              'private-instance-method',
              'private-static-method'
            ]
          }
        ]
      }
    },
    {
      files: [
        '*.html'
      ],
      extends: [
        'plugin:@angular-eslint/template/recommended'
      ],
      rules: {}
    }
  ]
};
