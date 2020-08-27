const path = require('path')
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  productionSourceMap: false,
  devServer: {
    proxy: {
      // '/api': {
      //   target: process.env.VUE_APP_API_URL,
      //   ws: true,
      //   changeOrigin: true
      // }
      '/api': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        import: path.resolve(__dirname, 'src/static/styl/*.styl')
      }
    }
  }
}
