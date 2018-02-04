module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "flowtype"
  ],
  "extends": "airbnb",
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
    "no-trailing-spaces": "off",
    "max-len": "off"
  },
};
