import axios from 'axios'
// import {
//     Message
// } from 'element-ui'
import utils from '../src/common/js/utils'
import qs from 'qs'

// 记录和显示错误
// function errorLog(err) {
//     // 显示提示
//     Message({
//         message: err.message,
//         type: 'error',
//         duration: 5 * 1000
//     })
// }

// 创建一个错误
// eslint-disable-next-line no-unused-vars
// function errorCreate(msg) {
//     const err = new Error(msg)
//     errorLog(err)
//     throw err
// }

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 30000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers.post = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cid': utils.getQueryVariable('cid') || 30
        }
        config.transformRequest = [(data) => {
            data.company = localStorage.getItem('company') || 15
            return qs.stringify(data)
        }]
        return config
    },
    error => {
        // 发送失败
        // console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        if (!dataAxios) {
            // try {
            //     console.log('服务器正忙')
            // } catch (e) {
            //     console.log(e)
            // }
            return false
        } else {
            // 这个状态码是和后端约定的
            const code = dataAxios.code
            // 根据 code 进行判断
            if (code === undefined) {
                // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
                return dataAxios
            } else {
                // 有 code 代表这是一个后端接口 可以进行进一步的判断
                switch (code) {
                case 0:
                    return dataAxios.data
                    // case 1:
                    //     // 后台报错
                    //     console.log(dataAxios.msg)
                    //     break
                default:
                    break
                }
            }
        }
    },
    error => {

        // errorLog(error)
        return Promise.reject(error)
    }
)

export default service