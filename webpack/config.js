const { NODE_ENV } = process.env;
const path = require('path');

const devServer = require('./dev-server');
const rules = require('./loaders');
const plugins = require('./plugins');

const developmentEntries = NODE_ENV === 'production' ? [] : [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?reload=true',
];

const config = {
  devtool: (NODE_ENV === 'development') ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  entry: {
    app: developmentEntries.concat([
      path.join(__dirname, '../src/sass/style.scss'),
      path.join(__dirname, '../src/js/app.js'),
    ]),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
    publicPath: '/',
  },
  module: {
    rules,
  },
  plugins,
  devServer,
  performance: {
    hints: false,
  },
};

module.exports = config;
