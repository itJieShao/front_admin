import axios from 'axios'
import qs from "qs";
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method == 'post') {
      config.data = config.data ? config.data : {};
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data.token = getToken()
      config.data = qs.stringify(config.data)
    }

    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.status) {
      if (res.error.errorcode == 666) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      Message({
        message: res.error.errormsg || 'Error',
        type: 'error',
        duration: 1000
      })
    } else {
      return res.data
    }
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 1000
    })
    return Promise.reject(error)
  }
)

export default service
