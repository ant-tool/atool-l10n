import 'babel-polyfill';
import { resolvePlugins } from './plugin';
import createContext from './context';
import log from 'spm-log';

export default function translate(options) {
  const { cwd, middlewares } = {
    cwd: process.cwd(),
    ...options,
  };

  const resolveDir = [cwd];
  const pluginNames = Array.isArray(middlewares)
    ? middlewares
    : Object.keys(middlewares).reduce((a, b) => a.concat(middlewares[b]), []);

  const plugins = resolvePlugins(pluginNames, resolveDir, cwd);

  const pluginThis = createContext({
    cwd,
  });

  log.info('atool-l10n', plugins.map(plugin => plugin.name).join(', '));
  plugins.reduce((a, b) => {
    if (a instanceof Promise) {
      return a.then(result => b.plugin.call(pluginThis, b.query, result));
    }
    return b.plugin.call(pluginThis, b.query, a);
  }, Promise.resolve());
}
