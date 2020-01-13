const fs = require('fs');
const path = require('path');

// to combine below plugins in more  readable way in comparing with default using currying
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// to remove some directories before
const CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// to add less loader for styles parsing
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
// to load .env file variables to process.env
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
const withNextEnv = nextEnv();

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/antd-custom.less'), 'utf8'),
);

module.exports = withPlugins([
  [CleanWebpackPlugin, ['out', '.next']],

  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        // to make your antd custom effective
        modifyVars: themeVariables,
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          });
        }

        // to replace moment.js to day.js in ant library (reduce bundle size a lot)
        config.plugins.push(new AntdDayjsWebpackPlugin());

        // to load svg as react component
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });

        const isDev = process.env.NODE_ENV !== 'production';

        if (isDev) {
          if (Array.isArray(config.optimization.minimizer)) {
            config.optimization.minimizer.push(new OptimizeCssAssetsPlugin({}));
          }
        }

        // to ignore errors related with css chunks order
        config.plugins.push(
          ...[
            // Instantiate the plugin and add it as a Webpack plugin
            new FilterPlugin({
              filter: /chunk styles \[mini-css-extract-plugin]\nConflicting order between:/,
            }),
          ],
        );

        /** to use only icons which we use in app - other won't be added to bundle */
        config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(
          __dirname,
          './public/icons.js',
        );

        /* to fix antd bug in dev development when styles are not completely loaded
          we need to load all lib styles in dev mode
          */
        if (isDev) {
          config.resolve.alias[(__dirname, './public/empty.less')] = path.resolve(
            __dirname,
            './public/allAntStyles.less',
          );
        }
        return config;
      },
    },
  ],
  [withBundleAnalyzer, {}],
  [withNextEnv],
]);

// https://github.com/luffyZh/next-antd-scaffold/blob/master/docs/FAQ.md#the-solution-of-min-css-extract-plugin-warning-in-the-console
// define the webpack plugn
class FilterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('FilterPlugin', compilation => {
      compilation.warnings = compilation.warnings.filter(
        warning => !this.options.filter.test(warning.message),
      );
    });
  }
}
