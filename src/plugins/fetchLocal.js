import log from 'spm-log';
import { join } from 'path';

export default function skipLocal(query) {
  const { source, skip } = {
    source: 'locales',
    skip: true,
    ...query,
  };

  const langs = Object.keys(this.LANGS)
    .filter(lang => this.existsResolve(join(this.context.cwd, source, lang)));

  if (!(langs.length)) {
    log.info('fetchLocal', 'no local files need to be processed');
    return;
  }

  log.info('fetchLocal', `from ${source}, language: ${langs}, skip ${skip}`);

  const localCollect = langs
    .reduce((collect, lang) => {
      const content = require(join(this.context.cwd, source, lang));
      this.getList().forEach(id => {
        if (content[id]) {
          this.setOption(id, lang, {
            local: content[id],
          });
        }
      });
      return {
        ...collect,
        [lang]: content,
      };
    }, {});
  this._store.local = localCollect;

  if (skip) {
    this.getTodo().forEach(id => {
      const needSkip = langs.every(lang => this.getLocal(lang)[id]);
      if (needSkip) {
        this.addSkip(id);
        this.setResult(id, langs.reduce((collect, lang) => ({
          ...collect,
          [lang]: this.getLocal(lang)[id],
        }), {}));
        log.warn('add to skip', id);
      }
    });
  }
}
