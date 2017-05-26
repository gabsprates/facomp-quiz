const { NODE_ENV } = process.env;
const path = require('path');
const { extract } = require('extract-text-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: (loader) => {
      require('postcss-flexbugs-fixes')();
      require('autoprefixer')({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
        flexbox: 'no-2009',
      });
      if (NODE_ENV === 'production') {
        require('cssnano')();
      }
    }
  }
}

module.exports = [
  {
    test: /\.jsx?$/,
    include: path.join(__dirname, '../src'),
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.s(c|a)ss$/,
    use: NODE_ENV === 'development'
      ? ['style-loader', 'css-loader', postcssLoader, 'sass-loader']
      : extract({
        fallback: 'style-loader',
        use: ['css-loader', postcssLoader, 'sass-loader']
      }),
  },
  {
    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
    use: 'url-loader?limit=10000',
  },
  {
    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
    use: 'file-loader',
  }
];
