import merge from 'webpack-merge';
import webpack from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base from './webpack.base.config';

export default function (argv) {
  return merge(base(argv), {
    // Emit a source map for easier debugging
    devtool: argv.devtool,

    entry: {
      manifest: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
      ],
      app: './app/index.jsx',
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
  });
}

