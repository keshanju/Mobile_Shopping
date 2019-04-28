/* eslint-disable */
// 测试配置文件


// 首先检查node和npm的版本
require('./check-versions')()

// 获取配置文件中默认的配置
var config = require('../config')
// 如果node无法判断当前是开发环境还是生产环境，则使用config.dev.env.NODE_ENV作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')// 用来在起来服务之后，打开浏览器并跳转指定URL
var path = require('path')// node自带文件路径工具
var express = require('express')// node框架express（本地开发的核心，起服务）
var webpack = require('webpack')// webpack,压缩打包
var proxyMiddleware = require('http-proxy-middleware')// 中间件
var webpackConfig = require('./webpack.dev.conf')// 开发环境的webpack配置
var mockMiddleware = require('../config/dev.mock')// 开发环境本地mock数据中间件

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable

var app = express()// 起服务
var compiler = webpack(webpackConfig)// webpack进行编译

// webpack-dev-middleware将编译的文件放在内存中，后续注入
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
// 热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// proxyTable中的配置挂载到express中
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 处理后退的时候匹配资源
app.use(require('connect-history-api-fallback')())

// 暂存在内存的webpack编译后的文件挂载到express上
app.use(devMiddleware)

// 将本地mock中间件挂载到express上
app.use(mockMiddleware);

// 热加载挂载到express上
app.use(hotMiddleware)

// 拼static静态资源文件路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// express为静态资源提供服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
// 通过配置的端口，自动打开浏览器，并跳转拼好的URL，至此，发开环境已经跑起来了
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
// node自带路径工具.
var path = require('path')
// 分为两种环境，dev和production
module.exports = {
  build: {
    env: require('./prod.env'),// 使用config/prod.env.js中定义的编译环境
    index: path.resolve(__dirname, '../dist/index.html'),// 编译输入的index.html文件。node.js中，在任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名,
    assetsRoot: path.resolve(__dirname, '../dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器或者cdn域名
    productionSourceMap: false,//是否开启cssSourceMap
    productionGzip: false,// 是否开启gzip
    productionGzipExtensions: ['js', 'css'],// 需要用gzip压缩的文件扩展名
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8989,// 起服务的端口
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},// 需要代理的接口，可以跨域
    cssSourceMap: false
  }
}