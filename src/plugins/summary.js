import { sync } from 'glob';
import { join } from 'path';
import log from 'spm-log';

function parseMeta(cwd, sourcePattern) {
  const patternArray = Array.isArray(sourcePattern) ? sourcePattern : [sourcePattern];
  return patternArray.map(pattern => sync(join(cwd, pattern)))
    .reduce((a, b) => a.concat(b))
    .map(file => require(file))
    .reduce((a, b) => a.concat(b));
}

export default function summary(query) {
  const { sourcePattern } = {
    sourcePattern: 'i18n-messages/**/*.json',
    ...query,
  };
  log.info('summary', sourcePattern);

  const metaArray = parseMeta(this.context.cwd, sourcePattern);

  const meta = this.arrayToObject(metaArray, 'id');
  this._store.meta = meta;
  this._store.list = Object.keys(meta);
}
