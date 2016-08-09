import { LANGS } from './static';
import * as utils from './util';
import log from 'spm-log';

export default function createContext(context, others) {
  return {
    context,
    LANGS,
    _store: {
      meta: {},
      local: {},
      list: [],
      skip: [],
      result: {},
    },
    getMeta(id) {
      return id ? this._store.meta[id] || {} : this._store.meta;
    },
    getLocal(lang) {
      return lang ? this._store.local[lang] || {} : this._store.local;
    },
    getList() {
      return this._store.list;
    },
    getSkip() {
      return this._store.skip;
    },
    addSkip(id) {
      if (this._store.skip.indexOf(id) === -1) {
        this._store.skip.push(id);
      }
    },
    getTodo() {
      return this._store.list.filter(id => this._store.skip.indexOf(id) === -1);
    },
    getResult(id) {
      return id ? this._store.result[id] : Object.keys(this._store.result).map(each => ({
        id: each,
        ...this._store.result[each],
      }));
    },
    setResult(id, result) {
      if (id) {
        this._store.result[id] = {
          ...this._store.result[id],
          ...result,
        };
      } else {
        log.error('set Result', 'set result failed');
      }
    },
    removeOption(id, lang, key) {
      delete this._store.result[id][lang][key];
    },
    setOption(id, lang, option) {
      this._store.result[id] = this._store.result[id] || {};
      const record = this._store.result[id];

      switch (this.typeOf(record[lang])) {
        case 'object':
          record[lang] = {
            ...record[lang],
            ...option,
          };
          break;
        case 'array':
          log.error('setOptionForLang', 'type error');
          break;
        case 'string':
          record[lang] = {
            [record[lang]]: record[lang],
            ...option,
          };
          break;
        case 'undefined':
          record[lang] = {
            ...option,
          };
          break;
        default:
          log.error('setOptionForLang', 'unSupported type');
      }
    },
    getOptionValues(id, lang) {
      const record = this._store.result[id][lang];
      switch (this.typeOf(record)) {
        case 'object':
          return Object.keys(record).map(key => record[key]);
        case 'string':
          return [record];
        case 'undefined':
          return [];
        default:
          log.error('getResultValues', 'unSupported type');
          return false;
      }
    },
    ...utils,
    ...others,
  };
}
