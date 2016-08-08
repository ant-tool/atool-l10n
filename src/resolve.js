import resolve from 'resolve';

function tryResolve(name, dirname) {
  let result;
  try {
    result = resolve.sync(name, {
      basedir: dirname,
    });
  } catch (e) {} // eslint-disable-line no-empty
  return result;
}

export default function (name, _resolveDir) {
  const resolveDir = Array.isArray(_resolveDir) ? _resolveDir : [_resolveDir];

  let result;
  resolveDir.some(dirname => {
    result = tryResolve(`intl-plugin-${name}`, dirname) || tryResolve(name, dirname);
    return result;
  });
  return result;
}
