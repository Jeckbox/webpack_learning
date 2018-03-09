module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "import/imports-first": 0,
        "import/newline-after-import": 0,
        "import/no-dynamic-require": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-named-as-default": 0,
        "import/no-webpack-loader-syntax": 0,
        "import/prefer-default-export": 0,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "jsx-a11y/aria-props": 2,
        "jsx-a11y/heading-has-content": 0,
        "jsx-a11y/href-no-hash": 2,
        "jsx-a11y/label-has-for": 2,
        "jsx-a11y/mouse-events-have-key-events": 2,
        "jsx-a11y/media-has-caption": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/role-has-required-aria-props": 2,
        "jsx-a11y/role-supports-aria-props": 2
    }
};