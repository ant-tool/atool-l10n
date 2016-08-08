#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');

program
  .version(require(path.join(__dirname, '../package.json')).version, '-v, --version')
  .option('--config <dir>', 'where is the config file, default is l10n.config.js', 'l10n.config.js')
  .parse(process.argv);

const defaultOptions = {
  middlewares: {
    summary: ['summary?sourcePattern=i18n-messages/**/*.json'],
    process: [
      'fetchLocal?source=locales',
      'metaToResult?from=defaultMessage,to=zh',
      'youdao',
      'reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta',
    ],
    emit: ['save?dest=locales'],
  },
};

const config = program.config && fs.existsSync(path.join(process.cwd(), program.config))
  ? require(path.join(process.cwd(), program.config))
  : defaultOptions;

require('../lib/translate')(Object.assign({}, config, {
  cwd: process.cwd(),
}));
