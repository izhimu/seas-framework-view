module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "e",
          "ctx",
          "req",
          "request",
          "res",
          "response",
          "state",
          "config",
          "item",
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: {
    tinymce: true,
  },
};
