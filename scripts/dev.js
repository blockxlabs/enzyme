const createWebpackServer = require('webpack-httpolyglot-server');
const tasks = require('./tasks');
const devConfig = require('../webpack/dev.config');

const argv = process.argv.slice(2);
const browser = argv.indexOf('--firefox') !== -1 ? 'firefox' : 'chrome';

tasks.replaceWebpack();
console.log('[Copy assets for browser]');
console.log('-'.repeat(80));
tasks.copyAssets('dev', browser);

console.log('[Webpack Dev]');
console.log('-'.repeat(80));
console.log("If you're developing Inject page,");
console.log('please allow `https://localhost:3000` connections in Google Chrome,');
console.log(
  'and load unpacked extensions with `./dev` folder. (see https://developer.chrome.com/extensions/getstarted#unpacked)\n',
);
createWebpackServer(devConfig, {
  host: 'localhost',
  port: 3000,
});
