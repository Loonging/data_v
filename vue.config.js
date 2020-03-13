// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
// 基础路径
let publicPath = process.env.NODE_ENV === 'production' ? './' : '/'

module.exports = {
    publicPath, // 根据你的实际情况更改这里
    devServer: {
        publicPath, // 和 publicPath 保持一致
        proxy: {
            // '/Admin': {
            //     target: 'http://xxxxxxxx.cn/', // 跨域地址
            //     secure: false,
            //     changeOrigin: true
            // }

        }
    },
    // 将构建好的文件输出到哪里
    outputDir: 'admin',

    // 放置静态资源的地方 (js/css/img/font/...)
    // assetsDir: '',

    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    lintOnSave: 'error',
    // babel-loader 默认会跳过 node_modules 依赖。
    // 通过这个选项可以显式转译一个依赖。
    // transpileDependencies: [/* string or regex */],

    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    css: {
        loaderOptions: {
            // 设置 scss 公用变量文件
            sass: {
                prependData: '@import \'~@/common/scss/variables.scss\';'
            }
        },
        extract: true,
        sourceMap: false
    },
    // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
    chainWebpack: config => {
        /**
         * 删除懒加载模块的 prefetch preload，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
         * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
         */
        config.plugins
            .delete('prefetch')
            .delete('preload')
        // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
        config.resolve
            .symlinks(true)
        // 重新设置 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@views', resolve('src/views'))
            .set('@api', resolve('src/api'))
            .set('@common', resolve('src/common/util'))
            .set('@components', resolve('src/components'))
        // node
        config.node
            .set('__dirname', true)
            .set('__filename', true)
    }
}