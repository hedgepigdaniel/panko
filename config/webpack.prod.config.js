import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './webpack.base.config';

export default function (argv) {
  return merge(base(argv), {
    // Emit a source map for easier debugging
    devtool: argv.devtool,

    entry: {
      app: [
        './app/index.jsx',
      ],
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: false,
          toplevel: true,
        },
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        comments: false,
        sourceMap: !!argv.devtool,
      }),
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        minify: {
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
        },
        inject: true,
      }),
    ],
  });
}
