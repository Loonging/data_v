//import util from '@common/js/util.cookie'
export const ERR_OK = 0
export const ERR_NO = 1
export const ERR_JUMP = 2
export const ERR_EVAL = 3

// 登录态Token异常
export const ABN_NO = 103

// 权限不足
export const VER_NO = 102
//export const TOKEN = util.cookie.get('token')
export const HEADERS = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
    //'X-Token': TOKEN
}