import yargs from 'yargs';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import makeWebpackConfigDev from './webpack.dev.config';
import makeWebpackConfigProd from './webpack.prod.config';
import statsOptions from './webpackStats.config';

function runDevServer(argv) {
  const compiler = Webpack(makeWebpackConfigDev(Object.assign({ watch: true }, argv)));
  const server = new WebpackDevServer(compiler, {
    stats: statsOptions,
    compress: true,
    hot: argv.hmr,
    publicPath: '/',
  });
  server.listen(argv.port);
}

function build(argv) {
  process.env.NODE_ENV = 'production';
  const compiler = Webpack(makeWebpackConfigProd(Object.assign({ watch: false }, argv)));
  compiler.run((err, stats) => {
    if (err) {
      process.exit(1);
    } else {
      console.log(stats.toString(statsOptions));
      if (stats.hasErrors() || stats.hasWarnings()) {
        process.exit(2);
      } else {
        process.exit(0);
      }
    }
  });
}

const _argv = yargs // eslint-disable-line no-unused-vars,no-underscore-dangle
  .command('dev-server', 'Start webpack dev server for development', (command) => {
    return command
      .describe('hmr', 'Enable hot module reloading').boolean('hmr').default('hmr', true)
    ;
  }, (argv) => {
    runDevServer(argv);
  })
  .command('build', 'Build project', () => {}, (argv) => {
    build(argv);
  })
  .describe('port', 'HTTP port from which to server the app')
  .number('port')
  .default('port', 3000)
  .describe('stats', 'Collect statistics on the compilation')
  .choices('stats', ['server', 'static', 'disabled'])
  .default('stats', 'disabled')
  .describe('devtool', 'Source map preset (see webpack docs)')
  .default('devtool', 'source-map')
  .help('help')
  .argv
;
