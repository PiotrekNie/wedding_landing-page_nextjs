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
      version: "latest",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "max-len": ["warn", 530],
    "no-empty": 1,
    "linebreak-style": [1, "unix"],
    quotes: [2, "single"],
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
