module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "eslint:recommended", "plugin:prettier/recommended", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "no-param-reassign": 0,
    "max-len": ["warn", 530],
    "no-empty": 1,
    "linebreak-style": [1, "unix"],
    quotes: [2, "double"],
    "no-unused-expressions": [
      1,
      {
        allowTernary: true,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    "react/jsx-props-no-spreading": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/typedef": [
          "error",
          {
            arrayDestructuring: true,
            objectDestructuring: true,
            arrowParameter: true,
            variableDeclaration: true,
            memberVariableDeclaration: true,
            parameter: true,
            propertyDeclaration: true,
          },
        ],
        "@typescript-eslint/no-inferrable-types": [0],
        "@typescript-eslint/member-ordering": ["error"],
      },
    },
  ],
};
