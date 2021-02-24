import axios from 'axios'
import qs from "qs";
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

import {sha1} from './util.js';
import {hex_md5} from './md5.js';

const appid = "d2wwx7chvj4fv07s";
const secretKey = '196faJpj72pufA0uzBxYi6HaIOK77TbG';

function sortByKey(obj) {
  const newkey = Object.keys(obj).sort();
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;
}

function unicode_die(data) {
  var arr = [];
  var nobj = sortByKey(data);
  for (var k in nobj) {
    arr.push(encodeURIComponent(nobj[k]));
  }
  var decoe = arr.join('');
  var str = decoe + secretKey;
  return sha1(str);
}

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
      config.data.token = getToken();
      config.data.appid = appid;
      config.data.timediff = 30;
      config.data.timestamp = parseInt(Date.now()/1000);
      config.data.nonce = hex_md5(Date.now());

      let person1 ={};
	    Object.assign(person1,config.data);
	    let signature = unicode_die(person1);
    	config.data.signature = signature;

      config.data = qs.stringify(config.data);
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
