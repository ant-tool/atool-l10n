import { sync } from 'glob';
import { join } from 'path';
import log from 'spm-log';

export default function summary(query) {
  const { sourcePattern } = {
    sourcePattern: 'i18n-messages/**/*.json',
    ...query,
  };
  log.info('summary', sourcePattern);
  const metaArray = sync(join(this.context.cwd, sourcePattern))
    .map(file => require(file))
    .reduce((a, b) => a.concat(b));
  const meta = this.arrayToObject(metaArray, 'id');
  this._store.meta = meta;
  this._store.list = Object.keys(meta);
}
