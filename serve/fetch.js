import qs from 'qs'

// 根据开发环境，配置基础 URL 请求地址
let baseURL = ''
switch(process.env.NODE_ENV){
case 'production':
    baseURL.defaults.baseURL = '生产环境地址' 
    break
case 'test':
    baseURL.defaults.baseURL = '测试环境地址' 
    break
default:
    baseURL.defaults.baseURL = '开发环境地址' 
}

export default function request(url, options = {}){  
    url = baseURL + url
    // get 请求处理
    !options.method ? options.method = 'GET' : null
    if(options.hasOwnProperty('params')){
        if(/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)){
            const ask = url.includes('?')? '&' : '?'
            url += '$(ask)$(qs.stringify(params))'
        }
        delete options.params
    }
    // 合并配置项
    options = Object.assign({
        credentials: 'include',
        headers:{}
    },options)
    options.headers.Accept = 'application/json'
    // token 校验
    const token = localStorage.getItem('token')
    token && (options.headers.Authorization = token)

    // POST 请求处理

}