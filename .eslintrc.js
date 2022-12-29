module.exports = {
  root: true,
  extends: ['airbnb-typescript' /*"prettier"*/],
  plugins: ['react', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaVersion: 2017,
    project: ['tsconfig.json'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      // processor: '@graphql-eslint/graphql',
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      env: {
        es6: true,
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/naming-convention': [
          'error',
          {
            OperationDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
              forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
            },
          },
        ],
      },
    },
  ],
};
// {
//   "extends": ["airbnb-typescript", "prettier"],
//   "plugins": ["react", "jsx-a11y", "import"],
//   "rules": {
//     "no-unused-vars": "warn",
//     "no-else-return": "off",
//     "react/no-did-update-set-state": "off",
//     "prefer-destructuring": "off",
//     "react/prefer-stateless-function": "off",
//     "react/prop-types": "off",
//     "react/no-danger": "off",
//     "react/button-has-type": "off",
//     "react/jsx-filename-extension": "off",
//     "react/no-array-index-key": "off",
//     "react/destructuring-assignment": "off",
//     "import/no-named-as-default": "off",
//     "import/no-named-as-default-member": "off",
//     "react/jsx-curly-brace-presence": "off",
//     "react/jsx-one-expression-per-line": "off",
//     "jsx-a11y/click-events-have-key-events": "off",
//     "jsx-a11y/no-static-element-interactions": "off",
//     "jsx-a11y/accessible-emoji": "off",
//     "jsx-a11y/label-has-associated-control": "off",
//     "jsx-a11y/label-has-for": "off",
//     "eslint.autoFixOnSave": true,
//     "jsx-a11y/anchor-is-valid": [
//       0,
//       {
//         "components": ["Link"],
//         "specialLink": ["hrefLeft", "hrefRight", "to"],
//         "aspects": ["noHref", "invalidHref", "preferButton"]
//       }
//     ]
//   },
//   "settings": {
//     "import/core-modules": []
//   },
//   "env": {
//     "browser": true
//   },
//   "parser": "babel-eslint"
// }