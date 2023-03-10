//对axios进行二次封装（模拟数据）
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
//start：进度条开始  done：进度条结束

// 1.利用axios的create方法，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置了一下
const requests = axios.create({
    //配置对象
    baseURL: "/mock",
    // 代表请求超时的时间5s
    timeout: 5000
})

// 请求拦截器：在请求发出去之前可以检测到，并且可以做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要===请求头（header）
    // 进度条开始
    nProgress.start()
    return config
})

// 响应拦截器：在服务器响应数据发过来的之前可以检测到，并且可以做一些事情
requests.interceptors.response.use((res) => {
    //服务器响应成功的回调
    //进度条结束
    nProgress.done()
    return res.data
}, (error) => {
    //服务器响应失败的回调(可以打印一些错误信息/可以终止promise链)
    return Promise.reject(new Error(error.message))
})

// 对外暴露
export default requests