'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // vue设置的代理，用以解决 跨域 问题
    proxyTable: {},

    // Various Dev Server settings
    // env: {NODEENV: '"development"'},
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  build: {
    // 使用config/prod.env.js中定义的编译环境
    env: require('./prod.env'),

    // 编译输入的index.html文件。node.js中，在任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名,
    index: path.resolve(__dirname, '../dist/index.html'),

    // 编译输出的静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 编译输出的二级目录
    assetsSubDirectory: 'static',

    // 编译发布的根目录，可配置为资源服务器或者cdn域名
    assetsPublicPath: './',

    //是否开启cssSourceMap
    productionSourceMap: true,

    devtool: '#source-map',

    // 是否开启gzip
    productionGzip: false,
    // 需要用gzip压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
