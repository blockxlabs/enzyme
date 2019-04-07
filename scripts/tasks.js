require('shelljs/global');

exports.replaceWebpack = () => {
  const replaceTasks = [
    {
      from: 'webpack/replace/JsonpMainTemplate.runtime.js',
      to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js',
    },
    {
      from: 'webpack/replace/process-update.js',
      to: 'node_modules/webpack-hot-middleware/process-update.js',
    },
  ];

  replaceTasks.forEach(task => cp(task.from, task.to));
};

exports.copyAssets = (type, browser) => {
  require('shelljs/global');

  const env = type === 'build' ? 'prod' : type;
  rm('-rf', `${type}`);
  exec(`mkdir ${type}`);
  cd(`${type}`);
  exec(`mkdir ${browser}`);
  cd('..');
  cp(`browser/manifest.${env}.${browser}.json`, `${type}/${browser}/manifest.json`);
  cp('-R', 'browser/assets/*', `${type}/${browser}`);
  exec(`pug -O "{ env: '${env}' }" -o ${type}/${browser} browser/views/`);
};
