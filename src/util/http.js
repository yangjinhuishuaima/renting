import axios from 'axios'

let http = axios.create({
  // 访问的根路径
  baseURL: 'http://localhost:8090/',
  // 请求超时时间
  timeout: 5000,
  // 是否携带凭证
  withCredentials: true,
  responseType: 'json',
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default http
