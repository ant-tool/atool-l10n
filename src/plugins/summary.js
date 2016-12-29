import { sync } from 'glob';
import { join } from 'path';
import log from 'spm-log';

function parseMeta(cwd, sourcePattern) {
  const patternArray = Array.isArray(sourcePattern) ? sourcePattern : [sourcePattern];
  try {
    return patternArray.map(pattern => sync(join(cwd, pattern)))
    .reduce((a, b) => a.concat(b), [])
    .map(file => require(file))
    .reduce((a, b) => a.concat(b), []);
  } catch (e) {
    log.error('summary', e);
    return false;
  }
}

export default function summary(query) {
  const { sourcePattern } = {
    sourcePattern: 'i18n-messages/**/*.json',
    ...query,
  };
  log.info('summary', sourcePattern);

  const metaArray = parseMeta(this.context.cwd, sourcePattern);

  if (metaArray.length === 0) {
    log.warn('summary', 'no local files find, run webpack with babel-plugin-intl first');
  }

  const meta = this.arrayToObject(metaArray, 'id');
  this._store.meta = meta;
  this._store.list = Object.keys(meta);
}
