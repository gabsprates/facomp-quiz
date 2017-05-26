const { NODE_ENV } = process.env;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const developmentPlugins = NODE_ENV === 'production' ? [] : [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

const productionPlugins = NODE_ENV === 'development' ? [] : [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      reduce_vars: false,
    },
    output: {
      comments: false,
    },
    sourceMap: true,
  }),
  new ExtractTextPlugin({
    filename: 'styles.css',
  }),
  new ManifestPlugin({
    fileName: 'manifest.json',
  }),
  new SWPrecacheWebpackPlugin({
    filename: 'service-worker.js',
    logger(message) {
      if (message.indexOf('Total precache size is') === 0) {
        return;
      }
      console.log(message);
    },
    minify: true,
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__).*/],
    staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
  })
];

const plugins = [
  ...developmentPlugins,
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, '../src/index.html.ejs'),
    minify: (NODE_ENV === 'development') ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  }),
  ...productionPlugins,
];

module.exports = plugins;
