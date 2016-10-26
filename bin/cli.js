#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const isAli = require('is-ali-env');
const log = require('spm-log');

program
  .version(require(path.join(__dirname, '../package.json')).version, '-v, --version')
  .option('--config <dir>', 'where is the config file, default is l10n.config.js', 'l10n.config.js')
	.option('--no-verbose', 'supress non critical messages')
  .parse(process.argv);

const configPath = path.join(process.cwd(), program.config);

log.config({ quiet: !program.verbose });

isAli().then(function(flag) {
  if (program.config && !fs.existsSync(configPath)) {

		const defaultOptions = {
			middlewares: {
				summary: [
					['summary', { sourcePattern: 'i18n-messages/**/*.json' }]
				],
				process: [
					['fetchLocal', { source: 'locales', skip: true }],
					['metaToResult', { from: 'defaultMessage', to: 'zh' }],
					flag ? ['gugu', { from: ['zh'], to:['en'] }] : ['youdao', { apiname: 'iamatestmanx', apikey: '2137553564' }],
					['reduce', { autoPick: false, autoReduce: ['local', 'meta'] }],
				],
				emit: [
					['save', { dest: 'locales' }]
				],
			},
		};

    log.info('initial', `generating a config file ${program.config} in cwd...`);
    fs.writeFileSync(
      configPath,
      `module.exports = ${JSON.stringify(defaultOptions, null, 2)}`
    );
  }
  require('../lib/translate')(Object.assign({},
    require(configPath),
    { cwd: process.cwd() }
  ));
});
