import http from './index'

function getData(data) {
    const url = '/api/largescreen/getDeviceInfo'
    return http.post(url, data)
}

function getMapData(data) {
    const url = '/api/largescreen/getDeviceMapInfo'
    return http.post(url, data)
}

function getDataReal(data) {
    const url = '/api/largescreen/dataReal'
    return http.post(url, data)
}

function getAlarmReal(data) {
    const url = '/api/largescreen/alarmStatistic'
    return http.post(url, data)
}

function getSiteInfo(data) {
    const url = '/api/largescreen/getCompanyInfo'
    return http.post(url, data)
}

function getReportData(data) {
    const url = '/admin/devicestatistics/dataApi'
    return http.post(url, data)
}

function getDayReport(data) {
    const url = '/admin/devicestatistics/exportAllDataDev'
    return http.post(url, data)
}

function getRealData(data) { // 时时数据
    const url = '/api/companyScreen/getRealData'
    return http.post(url, data)
}

function getDayData(data) { // 日报数据
    const url = '/api/companyScreen/getDayData'
    return http.post(url, data)
}

function getCompanyInfo(data) { // 日报数据
    const url = 'api/companyScreen/getCompanyInfo'
    return http.post(url, data)
}

export {
    getData,
    getMapData,
    getDataReal,
    getAlarmReal,
    getSiteInfo,
    getReportData,
    getDayReport,
    getRealData,
    getDayData,
    getCompanyInfo
}