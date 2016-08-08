import { existsSync } from 'fs';
import { join } from 'path';

export function arrayToObject(arr, key) {
  return arr.reduce((collection, current) => ({
    ...collection,
    [current[key]]: {
      ...current,
    },
  }), {});
}

export function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

export function isAbsolute(filepath) {
  return filepath.charAt(0) === '/';
}

export function isProvided(filepath) {
  return existsSync(join(__dirname, 'plugins', `${filepath}.js`));
}

export function existsResolve(path) {
  try {
    require.resolve(path);
  } catch (e) {
    return false;
  }
  return true;
}

export function isObject(something) {
  return something && something.constructor === Object;
}

export function format(target, prefix) {
  const before = prefix || '';
  if (Array.isArray(target)) {
    return target.reduce((collection, item) => ({
      ...collection,
      [`${item} - ${before}`]: item,
    }), {});
  } else if (isObject(target)) {
    return Object.keys(target).reduce((collection, key) => ({
      ...collection,
      [`${target[key]} - ${before} ${key}`]: target[key],
    }), {});
  }
  return {
    [`${target} - ${before}`]: target,
  };
}


export function maxKeys(arr) {
  return Object.keys(arr[0]);
}


export function typeOf(thing) {
  if (thing && thing.constructor === Object) {
    return 'object';
  } else if (Array.isArray(thing)) {
    return 'array';
  }
  return typeof thing;
}
