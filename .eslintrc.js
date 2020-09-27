module.exports = {
    "env": {
        "browser": false,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
       
    ],
    "rules": {
      "no-underscore-dangle": ["error", { "allow": ["_id"] }]
    }
};
