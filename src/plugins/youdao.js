import log from 'spm-log';
import request from 'co-request';
import md5 from 'md5';
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
  if (params.key) {
    log.error('youdao', 'apikey is forbidden, apply another in http://fanyi.youdao.com/openapi?path=data-mode');
  }
  return false;
}

export default async function youdao(query) {
  const { appkey, appsecret, from, to, apiname: keyfrom, apikey: key } = {
    apiname: 'iamatestmanx',
    apikey: '2137553564',
    appkey: '',
    appsecret: '',
    from: 'zh',
    to: 'en',
    ...query,
  };

  let _from = from;
  let _to = to;
  if (_from === 'zh') _from = 'zh-CHS';
  if (_from === 'en') _from = 'EN';
  if (_to === 'zh') _to = 'zh-CHS';
  if (_to === 'en') _to = 'EN';

  // if (!appkey || !appsecret) {
  //   log.error('youdao', 'appkey or appsecret is missing, can apply in http://ai.youdao.com');
  //   return;
  // }

  const todo = this.getTodo();
  if (!(todo.length)) {
    log.info('youdao', 'no element need to be processed');
    return;
  }

  let url;
  if (appkey && appsecret) {
    log.info('youdao', `using appkey: ${appkey}, appsecret: ${appsecret}`);
    url = 'http://openapi.youdao.com/api';
  } else {
    log.info('youdao', `using apiname: ${keyfrom}, apikey: ${key}`);
    url = 'http://fanyi.youdao.com/openapi.do';
  }

  for (const id of todo) {
    const texts = this.getOptionValues(id, from);
    const salt = Date.now();
    if (!texts.length) {
      log.warn('youdao', `skip ${id} from zh to en`);
    } else {
      for (const q of texts) {
        let params = {
          keyfrom,
          key,
          type: 'data',
          doctype: 'json',
          version: '1.1',
          q,
        };
        if (appkey && appsecret) {
          const sign = md5(appkey + q + salt + appsecret);
          params = {
            appKey: appkey,
            salt,
            from: _from,
            to: _to,
            sign,
            q,
          };
        }
        const result = await words(url, params);
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
