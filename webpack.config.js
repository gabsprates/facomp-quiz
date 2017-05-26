const webpack = require('webpack');

module.exports = {

  entry: './src/js/app.js',
  output: {
    path: './dist/js',
    filename: 'app.js',
    publicPath: '/dist/js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],

  devServer: {
    inline: true
  }

};
