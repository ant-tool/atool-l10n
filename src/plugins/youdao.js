import log from 'spm-log';
import request from 'co-request';
import { stringify } from 'query-string';


async function words(url, params) {
  let times = 5;
  while (times > 0) {
    times --;
    try {
      const { body } = await request(`${url}?${stringify(params)}`);
      return JSON.parse(body).translation;
    } catch (e) {
      continue;
    }
  }
  log.error('youdao', 'apikey is forbidden, apply another in http://fanyi.youdao.com/openapi?path=data-mode');
  return false;
}

export default async function youdao(query) {
  const { apiname: keyfrom, apikey: key } = {
    apiname: 'iamatestmanx',
    apikey: '2137553564',
    ...query,
  };

  const todo = this.getTodo();
  if (!(todo.length)) {
    log.info('youdao', 'no element need to be processed');
    return;
  }

  log.info('youdao', `using apiname: ${keyfrom}, apikey: ${key}`);
  const url = 'http://fanyi.youdao.com/openapi.do';

  for (const id of todo) {
    const texts = this.getOptionValues(id, 'zh');
    if (!texts.length) {
      log.warn('youdao', `skip ${id} from zh to en`);
    } else {
      for (const q of texts) {
        const result = await words(url, {
          keyfrom,
          key,
          type: 'data',
          doctype: 'json',
          version: '1.1',
          q,
        });
        result.forEach(each => {
          log.info('youdao: zh -> en', `${q} -> ${each}`);
          this.setOption(id, 'en', {
            [`youdao, ${q}`]: each,
          });
        });
      }
    }
  }
}
