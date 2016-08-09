import log from 'spm-log';
import inquirer from 'inquirer';

async function select(target, message = 'pick the best one') {
  const optionKeys = Object.keys(target);
  if (optionKeys.length > 1) {
    const answer = await (inquirer.prompt({
      name: 'value',
      type: 'list',
      message,
      choices: Object.keys(target).map(each => ({
        value: target[each],
        name: `${target[each]} - from ${each}`,
      })),
    }));
    return answer.value;
  } else if (optionKeys.length === 1) {
    log.info('only one', `pick ${target[optionKeys[0]]}`);
    return target[optionKeys[0]];
  }
  return false;
}

export default async function reduce(query) {
  const { autoPick, autoReduce } = {
    autoPick: false,
    autoReduce: ['local', 'meta'],
    ...query,
  };

  const todo = this.getTodo();
  if (!(todo.length)) {
    log.info('reduce', 'no element need to be processed');
    return;
  }

  log.info('reduce', `autoPick ${autoPick} autoReduce ${autoReduce}`);

  for (const id of todo) {
    const record = this.getResult(id);

    const langs = Object.keys(record);
    for (const lang of langs) {
      if (autoPick && record[lang][autoPick]) {
        log.warn(`autoPick ${lang}@${id} with ${autoPick}`, record[lang][autoPick]);
        this.setResult(id, {
          [lang]: record[lang][autoPick],
        });
      } else {
        if (autoReduce && autoReduce.length) {
          autoReduce.reduceRight((end, start) => {
            if (record[lang][start]) {
              // refactor to parse split
              this.removeOption(id, lang, end);
              return start;
            }
            return end;
          });
        }
        if (this.typeOf(record[lang]) === 'object') {
          const success = await select(record[lang], `pinking ${lang} for ${id}`);
          this.setResult(id, {
            [lang]: success,
          });
        }
      }
    }
  }
}
