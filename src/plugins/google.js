import log from 'spm-log';
import translate from 'google-translate-api';

// https://github.com/matheuss/google-translate-response-spec

async function words(q, params) {
  return translate(q, { ...params })
    .then(res => res.text)
    .catch(err => log.error(err));
}

export default async function google(query) {
  const { from = 'zh-cn', to = 'en' } = query;

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
        const result = await words(q, { from, to });
        log.info('google: zh -> en', `${q} -> ${result}`);

        this.setOption(id, 'en', {
          [`google, ${q}`]: result,
        });
      }
    }
  }
}
