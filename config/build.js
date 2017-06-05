import yargs from 'yargs';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfigDev from './webpack.dev.config';
import statsOptions from './webpackStats.config';

function runDevServer(argv) {
  const compiler = Webpack(webpackConfigDev);
  const server = new WebpackDevServer(compiler, {
    stats: statsOptions,
  });
  server.listen(argv.port);
}

function build(argv) {
  console.log('BUILD');
  console.log(argv);
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
  // .describe('port', 'HTTP port from which to server the app')
  // .number('port')
  // .default('port', 3000)
  .help('help')
  .argv
;
