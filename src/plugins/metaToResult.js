import log from 'spm-log';
export default function metaToResult(query) {
  const { from, to } = {
    from: 'defaultMessage',
    to: 'zh',
    ...query,
  };
  log.info('metaToResult', `from meta.${from} to result.${to}`);

  this.getTodo().forEach(id => {
    this.setOption(id, to, {
      meta: this.getMeta(id)[from],
    });
  });
}
