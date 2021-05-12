module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    indent: "off",
    "@typescript-eslint/indent": ['warn', 4],
    'react/jsx-indent': ['warn', 4],
    'react/jsx-indent-props': ['warn', 4],
    semi: "off",
    "@typescript-eslint/semi": ['warn', 'never'],
    quotes: 'off',
    "@typescript-eslint/quotes": ['warn', 'single', {
      avoidEscape: true, allowTemplateLiterals: false
    }],
    'jsx-quotes': ['warn', 'prefer-double'],
    'comma-dangle': 'off',
    "@typescript-eslint/comma-dangle": ['off', {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      arrays: 'only-multiline',
      objects: 'always-multiline',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'never'
    }],
    'no-unused-vars': "off",
    "@typescript-eslint/no-unused-vars": ['warn', {
      vars: 'local',
      args: 'after-used'
    }],
    'no-trailing-spaces': ['warn', {
      skipBlankLines: true
    }],
    'spaced-comment': ['warn', 'always', {
      line: {
        markers: [],
        exceptions: ['-', '+', '/']
      },
      block: {
        markers: [],
        exceptions: ['*'],
        balanced: false
      }
    }],
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always'
    }],
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['noHref', 'invalidHref', 'preferButton']
    }],
    'react/jsx-props-no-multi-spaces': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'object-curly-spacing': "off",
    "@typescript-eslint/object-curly-spacing": ['warn', 'always'],
    'react/self-closing-comp': 'warn',
    'no-multiple-empty-lines': ['warn', {
      max: 2,
      maxEOF: 1,
      maxBOF: 0
    }],
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'object-curly-newline': ['off', {
      ObjectExpression: { minProperties: 0, multiline: true },
      ObjectPattern: { minProperties: 0, multiline: true }
    }],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'react/forbid-prop-types': ['warn', {
      forbid: ['any']
    }],
    'import/no-named-default': 'off',
    'react/jsx-max-props-per-line': ['warn', {
      maximum: 1, when: 'always'
    }],
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens'
    }],
    'no-param-reassign': ['off'],
    'react/jsx-closing-tag-location': ['off'],
    'react/jsx-curly-newline': ['off'],
    'operator-linebreak': ['warn', 'after', {
      overrides: {
        '&&': 'after'
      }
    }],
    'linebreak-style': 'off',
    'max-len': ['warn', { code: 120 }],
  },
};
