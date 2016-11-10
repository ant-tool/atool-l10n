import { sync } from 'glob';
import { join } from 'path';
import log from 'spm-log';

function parseMeta(cwd, sourcePattern) {
  return sync(join(cwd, sourcePattern))
    .map(file => require(file))
    .reduce((a, b) => a.concat(b));
}

export default function summary(query) {
  const { sourcePattern } = {
    sourcePattern: 'i18n-messages/**/*.json',
    ...query,
  };
  log.info('summary', sourcePattern);
  const metaArray = Array.isArray(sourcePattern) ?
    sourcePattern.map(pattern => parseMeta(this.context.cwd, pattern))
      .reduce((a, b) => a.concat(b))
    : parseMeta(this.context.cwd, sourcePattern);
  const meta = this.arrayToObject(metaArray, 'id');
  this._store.meta = meta;
  this._store.list = Object.keys(meta);
}
