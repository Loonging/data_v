/**
 * Created by Fakin on 2019/7/23
 */
let utils = {
    // 格式化千分位
    normalThousand(num) {
        return num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return s + ','
        })
    },
    getQueryVariable(variable) {
        let query = window.location.search.substring(1)
        let vars = query.split('&')
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=')
            if (pair[0] === variable) {
                return pair[1]
            }
        }
        return (false)
    },
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }

}
export default utils