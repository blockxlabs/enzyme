const tasks = require('./tasks');

const argv = process.argv.slice(2);
const browser = argv.indexOf('--firefox') !== -1 ? 'firefox' : 'chrome';

tasks.replaceWebpack();

console.log('[Copy assets for browser]');
console.log('-'.repeat(80));
tasks.copyAssets('build', browser);

console.log('[Webpack Build]');
console.log('-'.repeat(80));
let execStr = `SET TEMP_BROWSER=${browser}&& webpack --config webpack/prod.config.js --progress --profile --colors`;
if (process.platform === 'darwin' || process.platform === 'linux') {
  execStr = `export TEMP_BROWSER='${browser}'; webpack --config webpack/prod.config.js --progress --profile --colors`;
}
exec(execStr, (err, out, code) => {
  if (err) throw err;
  if (out) console.log(out);
  if (code) console.log(code);
});
