import { writeFileSync } from 'fs';
import log from 'spm-log';
import { join } from 'path';
import ensureDir from 'ensure-dir';

function sortKey(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((collect, current) => ({
      ...collect,
      [current]: obj[current],
    }), {});
}


export default function save(query) {
  const { dest } = {
    dest: 'locales',
    ...query,
  };
  log.info('save task', `dest is ${dest}`);

  const results = this.getResult();

  const saveResult = {};

  const dir = join(this.context.cwd, dest);

  results.forEach(result => {
    const langs = Object.keys(result).filter(lang => lang !== 'id');
    langs.forEach(lang => {
      saveResult[lang] = saveResult[lang] || { lang, content: {}, file: `${join(dir, lang)}.json` };
      saveResult[lang].content[result.id] = result[lang];
    });
  });

  ensureDir(dir).then(() => {
    Object.keys(saveResult).forEach(item => {
      writeFileSync(
        saveResult[item].file,
        JSON.stringify(sortKey(saveResult[item].content), null, 2)
      );
    });
  });
}
