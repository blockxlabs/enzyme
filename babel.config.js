/* eslint-disable no-param-reassign */

const plugins = [
  // ordering important, decorators before class properties
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-runtime',
  'add-module-exports',
];

const base = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Safari versions',
            'last 2 Firefox versions',
            'last 2 Edge versions',
          ],
        },
      },
    ],
  ],
  plugins,
};

const output = Object.keys(base).reduce((config, key) => {
  config[key] = base[key];

  if (key === 'plugins') {
    config[key] = config[key].concat(['@babel/plugin-syntax-dynamic-import']);
  } else if (key === 'presets') {
    config[key] = config[key].concat(['@babel/preset-react']);
  }

  return config;
}, {});

module.exports = output;
