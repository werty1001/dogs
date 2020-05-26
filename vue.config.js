
const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, './src/assets/stylus/mixins.styl'),
          path.resolve(__dirname, './src/assets/stylus/variables.styl'),
        ],
        'resolve url': true,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeDimensions: false }, { removeViewBox: false }],
        },
      });
  },
};
