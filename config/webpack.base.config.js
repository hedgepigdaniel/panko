import { resolve } from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';

import statsOptions from './webpackStats.config';

export default function (argv) {
  return {
    output: {
      path: resolve(process.cwd(), './dist'),
      filename: `[name]${argv.watch ? '' : '.[chunkhash]'}.js`,
      sourceMapFilename: `[name]${argv.watch ? '' : '.[chunkhash]'}.js.map`,
      chunkFilename: `[name]${argv.watch ? '' : '.[chunkhash]'}.js`,
      publicPath: '/',
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
          use: [
            'babel-loader',
            {
              loader: 'eslint-loader',
              options: {
                emitWarning: true,
                cache: true,
              },
            },
          ],
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
          use: 'css-loader',
        },
        {
          test: /\.scss$/,
          use: 'sass-loader',
        },
        // Fonts
        {
          test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[ext]?[hash]',
            },
          },
        },
      ],
    },

    plugins: [
      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),

      new BundleAnalyzerPlugin({
        generateStatsFile: true,
        analyzerMode: argv.stats,
        logLevel: 'silent',
      }),

      // new ChunkManifestPlugin({
      //   filename: 'manifest.json',
      //   manifestVariable: 'webpackManifest',
      //   inlineManifest: true,
      // }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
    ],

    stats: statsOptions,
  };
}
