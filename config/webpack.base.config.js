const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    path: resolve(process.cwd(), './dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
  },

  resolve: {
    modules: [
      resolve(process.cwd(), './app'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      // JavaScript / ES6
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // svg
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          `react-svg-loader?${JSON.stringify({
            svgo: {
              plugins: [{ removeTitle: false }],
              floatPrecision: 2,
            },
          })}`,
        ],
      },
      // css / scss
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader'],
        }),
      },
      // Fonts
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash]',
        },
      },
    ],
  },

  plugins: [
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin('style.css'),
  ],
}
