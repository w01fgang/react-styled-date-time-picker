const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'flow', 'react'],
            plugins: [
              [
                'transform-class-properties',
                'styled-components',
                { ssr: false, displayName: true, preprocess: true },
              ],
              'transform-es2015-modules-commonjs',
              'transform-react-inline-elements',
              'transform-react-pure-class-to-function',
              'transform-react-remove-prop-types',
              ['transform-object-rest-spread', { useBuiltIns: true }],
            ],
          },
        },
      },
    ],
  },
  externals: {
    react: 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    'styled-components': 'commonjs styled-components',
    luxon: 'commonjs luxon',
    'lodash.range': 'commonjs lodash.range',
    'lodash.chunk': 'commonjs lodash.chunk',
    'react-page-click': 'commonjs react-page-click',
  },
};
