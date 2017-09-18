const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()
const proxyRespJson = require('node-http-proxy-json')

const Promise = require('bluebird')
const request = require('request')
const chokidar = require('chokidar')
const path = require('path')
Promise.promisifyAll(request)

const _ = require('lodash')

const debug = require('debug')('app:proxy')
const config = require('../config')
const proxyOptions = config.dev.proxyOptions

const mockDataPath = path.resolve(__dirname, '../mockData')
let mockData = {}

// 基础接口对接的校验参数
const baseAuthStr = `Basic ${new Buffer('zcyadmin:vK6olR5IzoceCP8u').toString('base64')}`
// 调用接口时的校验参数
let authorizationValue = ''

function jsonParse (data) {
  console.log("数据------")
  console.log(data);
  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

function loadMockData() {
  try {
    // 清除缓存，需要清除整个目录
    Object.keys(require.cache).forEach(function (cachePath) {
      if (cachePath.startsWith(mockDataPath)) {
        delete require.cache[cachePath];
      }
    });
    mockData = require(mockDataPath)
  } catch (error) {
    debug('加载mock数据异常', error)
  }
}

/**
 * oauth接口的url
 */
function getOauthUri () {
  return `${proxyOptions.rules.uaa.host}/oauth/token?grant_type=password&username=${proxyOptions.user.account}&password=${proxyOptions.user.password}`
}

/**
 * 获取认证数据
 */
function getAuthorization () {
  // 已经存在，直接返回
  if (authorizationValue) {
    return Promise.resolve(authorizationValue)
  }

  const oauthUri = getOauthUri()
  return request.postAsync({
    uri: oauthUri,
    headers: {
      Authorization: baseAuthStr
    }
  })
  .then(function (res) {
    const data = jsonParse(res.body)
    authorizationValue = `${data.token_type} ${data.access_token}`
  })
}
// 获取oauth的token
getAuthorization()

function watchMockData() {
  chokidar.watch(mockDataPath).on('change', function(filepath) {
    debug('mock数据变化，重新加载', filepath)
    loadMockData()
  })
}

// 加载mock数据
loadMockData()
// 监听mock数据变化
watchMockData()

// 每小时固定执行，避免失效
setInterval(() => {
  authorizationValue = ''
  getAuthorization()
}, 60 * 60 * 1000)


proxy.on('error', function (err, req, res) {
  debug('proxy error:', err)
  const callback = mockData[req.path]
  // 传入req，用于部分mock获取request的数据
  const data = callback ? callback(req) : {}
  res.status(200).send(data)
})

proxy.on('proxyReq', function (proxyReq) {
  proxyReq.setHeader('Authorization', authorizationValue)
})

proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log(`请求代理状态: ${proxyRes.statusCode}  <==>  path: ${req.path}`)
  if (proxyRes.statusCode !== 200 && proxyRes.statusCode !== 400 && proxyRes.statusCode !== 403) {
    // 修改header，用于调整res的statusCode为200
    const _writeHead = res.writeHead
    Object.assign(res, {
      writeHead: () => {
        _writeHead.apply(res, [200, proxyRes.headers])
      }
    })
    proxyRespJson(res, proxyRes.headers['content-encoding'], (body) => {
      debug('请求远端服务异常，采用本地mock数据', req.path)
      const callback = mockData[req.path]
      // 传入req，用于部分mock获取request的数据
      return callback ? callback(req) : {}
    })
  }
})

module.exports = (app) => {
  /**
   * 初始化路由分发
   */
  _.forIn(proxyOptions.rules, (rule, key) => {
    _.forEach(rule.urls, (url) => {
      url && app.all(url, (req, res) => {
        proxy.web(req, res, {target: rule.host, changeOrigin: true, proxyTimeout: 2000})
      })
    })
  })
}
