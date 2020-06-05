import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果存在 token 则附带在 http header 中
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const errMsg = res.message || '登录失败'
    if (response.status !== 200) {
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 400) {
      Message({
        message: '用户名或密码错误',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response.status === 401) {
      Message({
        message: '账号过期请重新登录',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
