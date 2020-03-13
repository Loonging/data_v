import axios from 'axios'
import qs from 'qs'

// 根据开发环境，配置基础 URL 请求地址
switch(process.env.NODE_ENV){
case 'production':
    axios.defaults.baseURL = '生产环境地址' 
    break
case 'test':
    axios.defaults.baseURL = '测试环境地址' 
    break
default:
    axios.defaults.baseURL = '开发环境地址' 
}

// 设置超时时间和跨域是否运行携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

//设置请求传递数据格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)  //只对 POST 请求有用

// 请求拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        // 发送失败
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
axios.defaults.validateStatus = status =>{  // 自定义响应成功的 HTTP 状态码
    return /^(2|3)\d{2}$/.test(status)
}
axios.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        let {response} = error
        if(response){ // 服务器返回状态码
            switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break
            case 401:
                error.message = '未授权，请登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器内部错误'
                break
            case 501:
                error.message = '服务未实现'
                break
            case 502:
                error.message = '网关错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网关超时'
                break
            case 505:
                error.message = 'HTTP版本不受支持'
                break
            }
        }else{
            if(!window.navigator.onLine){
                // 断网处理 ： 跳转到断网页面
                alert('断网了')
            }
            return Promise.reject(error)
        }
    }
)

export default axios