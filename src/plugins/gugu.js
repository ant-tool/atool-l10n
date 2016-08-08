import log from 'spm-log';
import request from 'co-request';
import { stringify } from 'query-string';


async function words(url, text, from = 'zh', to = 'en') {
  const res = await request(`${url}?${stringify({ from, to, text })}`);
  return JSON.parse(res.body).data;
}

export default async function gugu(query) {
  const { from, to } = {
    from: 'zh',
    to: 'en',
    ...query,
  };
  log.info('gugu', `from ${from} to ${to}`);

  const url = 'http://gugu.alipay.net/suggestion';

  for (const id of this.getTodo()) {
    const text = this.getOptionValues(id, from);
    if (!text.length) {
      log.warn('gugu', `skip ${id} from ${to} to ${to}`);
    } else {
      const result = await words(url, text, from, to);
      result.forEach(each => {
        log.info(`gugu:${each.to}`, `${each.text} -> ${each.translate}`);
        this.setOption(id, each.to, {
          [`gugu, ${each.text}`]: each.translate,
        });
      });
    }
  }
}
