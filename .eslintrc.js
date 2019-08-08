module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "flowtype"
  ],
  "extends": ["airbnb", "plugin:flowtype/recommended"],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  },
  "env": {
    "node": true,
    "jest": true,
    "jasmine": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "max-len": "off"
  },
};
