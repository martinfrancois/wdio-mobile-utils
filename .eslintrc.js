module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    "plugins": ["@typescript-eslint", "jest"],
    "extends": [
        "eslint:recommended",
        "plugin:jest/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "rules": {
    },
}
