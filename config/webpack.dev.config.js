const merge = require('webpack-merge')
const { resolve } = require('path')
const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false,
  },

  entry: {
    app: [
      'react-hot-loader/patch',
      './app/index.js',
    ],
  },

  module: {
    rules: [

    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
  ],

  devServer: {
    hot: true,
    // enable HMR on the server

    historyApiFallback: true,

    contentBase: resolve(process.cwd()),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    port: 3000,
  },
})
