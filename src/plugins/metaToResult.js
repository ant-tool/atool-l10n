import log from 'spm-log';
export default function metaToResult(query) {
  const { from, to } = {
    from: 'defaultMessage',
    to: 'zh',
    ...query,
  };

  const todo = this.getTodo();
  if (!(todo.length)) {
    log.info('metaToResult', 'no element need to be processed');
    return;
  }

  log.info('metaToResult', `from meta.${from} to result.${to}`);

  todo.forEach(id => {
    if (this.getLocal(to)[id] && this.getMeta(id)[from] !== this.getLocal(to)[id]) {
      log.warn(`multiple ${to}@${id}`,
        `${this.getMeta(id)[from]}(meta) !== ${this.getLocal(to)[id]}(local)`);
    }
    this.setOption(id, to, {
      meta: this.getMeta(id)[from],
    });
  });
}
