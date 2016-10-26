import { join } from 'path';
import resolve from './resolve';
import { parseQuery } from 'loader-utils';
import { isAbsolute, isRelative, isProvided } from './util';

export function resolvePlugin(config, resolveDir, cwd = process.cwd()) {
  let plugin;
  let name;
  let query;

  if (typeof config === 'string') {
    [name, query] = config.split('?');
    query = query ? parseQuery(`?${query}`) : {};
  } else if (Array.isArray(config)) {
    name = config[0];
    query = config[1] || {};
  }

  if (isRelative(name)) {
    plugin = require(join(cwd, name));
  } else if (isAbsolute(name)) {
    plugin = require(name);
  } else if (isProvided(name)) {
    plugin = require(join(__dirname, 'plugins', name));
  } else {
    const pluginPath = resolve(name, resolveDir);
    if (!pluginPath) {
      throw new Error(`[Error] ${name} not found in ${resolveDir}`);
    }

    plugin = require(pluginPath);
  }

  return {
    plugin,
    name,
    query,
  };
}

export function resolvePlugins(plugins, resolveDir, cwd) {
  return plugins.map(plugin => resolvePlugin(plugin, resolveDir, cwd));
}
