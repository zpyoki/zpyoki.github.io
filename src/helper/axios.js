// import router from '@/router'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
// import qs from 'qs'
// import dink from 'dinkjs'
import { Message, Loading } from 'element-ui'
// import checkRequestCondition from '@/routers/admin/checkRequestCondition'
import api from '@/helper/api'
import config from '@/helper/config'
import mock from '@/helper/mock'
import dink from 'dinkjs'

// 请求拦截器
axios.interceptors.request.use((config) => {
  // baseUrl
  config.baseURL = '/' + process.env.VUE_APP_API_Prefix
  // timeout
  config.timeout = 60 * 1000
  // heartbeat
  dink.setStorage('lastRequestTime', dink.now())
  // 自定义headers
  Object.assign(config.headers, { Encrypt: dink.encrypt(config.encrypt ? 'true' : 'false') })
  Object.assign(config.headers, { token: dink.getStorage('token') })
  // isEncrypt
  // if (config.encrypt) {
  //   // 格式化request
  //   config.transformRequest = [function (data) {
  //     return qs.stringify(dink.encryptRequest(data))
  //   }]
  //   // 格式化response
  //   config.transformResponse = [function (data) {
  //     return dink.decryptResponse(data)
  //   }]
  // }
  // cancelToken
  // config.cancelToken = new axios.CancelToken((cancel) => {
  //   const currentPage = router.currentRoute.path
  //   const module = currentPage.substr(currentPage.indexOf('/') + 1, currentPage.indexOf('/', 1) - 1)
  //   if (module === 'admin') { checkRequestCondition(config.url, cancel) }
  // })
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  Message.error(error.message)
  return Promise.reject(error)
})

// 启用mock
function checkMock (options) {
  mock.filter((item) => {
    if (api[item.api]) { item.url = api[item.api] }
  })
  if (config.mock) {
    mock.filter((item) => {
      if (item.url === options.url) {
        const adapter = new MockAdapter(axios)
        adapter.onAny(options.url).reply(200, item.data)
      }
    })
  }
}

function request (rtype, options, func, func2) {
  checkMock(options)
  let loading
  if (options.loading) { loading = Loading.service({ target: options.loading }) }
  const requestData = options.data ? options.data : {}
  axios[rtype](options.url, rtype === 'post' ? requestData : { params: requestData })
    .then((res) => {
      if (loading) { loading.close() }
      if (func) { func(res) }
    })
    .catch((error) => {
      if (loading) { loading.close() }
      if (func2) { func2(error) }
    })
}

export default {
  get: function (options, func, func2) {
    request('get', options, func, func2)
  },
  post: function (options, func, func2) {
    request('post', options, func, func2)
  }
}
