import log from 'spm-log';

async function words(q, params) {
  return translate(q, {params}).then(res => {
    return res.text
  }).catch(err => log.error(err));
}

export default async function youdao(query) {
  const todo = this.getTodo();
  if (!(todo.length)) {
    log.info('google', 'no element need to be processed');
    return;
  }

  log.info('google translate starts');

  for (const id of todo) {
    const texts = this.getOptionValues(id, 'zh');
    if (!texts.length) {
      log.warn('google', `skip ${id} from zh to en`);
    } else {
      for (const q of texts) {
        const result = await words(q, {
          from: 'zh',
          to: 'en',
        });
        result.forEach(each => {
          log.info('google: zh -> en', `${q} -> ${each}`);
          this.setOption(id, 'en', {
            [`google, ${q}`]: each,
          });
        });
      }
    }
  }
}
