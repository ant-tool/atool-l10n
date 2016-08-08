import { join } from 'path';
import resolve from './resolve';
import { parseQuery } from 'loader-utils';
import { isAbsolute, isRelative, isProvided } from './util';

export function resolvePlugin(_pluginName, resolveDir, cwd = process.cwd()) {
  let plugin;
  let name = false;
  let query = {};

  if (typeof _pluginName === 'string') {
    const [pluginName, _query] = _pluginName.split('?');
    name = pluginName;
    if (_query) {
      query = parseQuery(`?${_query}`);
    }
    if (isRelative(pluginName)) {
      plugin = require(join(cwd, pluginName));
    } else if (isAbsolute(pluginName)) {
      plugin = require(pluginName);
    } else if (isProvided(pluginName)) {
      plugin = require(join(__dirname, 'plugins', pluginName));
    } else {
      const pluginPath = resolve(pluginName, resolveDir);
      if (!pluginPath) {
        throw new Error(`[Error] ${pluginName} not found in ${resolveDir}`);
      }
      plugin = require(pluginPath);
    }
  }

  return {
    query,
    plugin,
    name,
  };
}

export function resolvePlugins(pluginNames, resolveDir, cwd) {
  return pluginNames.map(pluginName => resolvePlugin(pluginName, resolveDir, cwd));
}
