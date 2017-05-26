const { NODE_ENV } = process.env;
const path = require('path');

module.exports = NODE_ENV === 'production' ? {} : {
  hot: true,
  contentBase: path.join(__dirname, '../dist'),
  publicPath: '/',
  historyApiFallback: true,
};
