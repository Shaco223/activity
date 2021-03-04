'use strict'
module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,

    //基本路径
    //publicPath: "./", //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
    // 输出文件目录
    outputDir: "dist",
    assetsDir: "static",
    indexPath: "index.html",
    filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 50, // 换算的基数
                        propList: ['*'],
                    }),
                ]
            }
        }
        // 是否使用css分离插件 ExtractTextPlugin
        //extract: true,
        // 开启 CSS source maps?
        //sourceMap: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: true, //open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
        host: "0.0.0.0", //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
        port: 3000,
        hot: true, //hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
        //https: false,
        //hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        // 设置代理
        //before: app => {}
        // proxy: { //代理配置
        //     '/api': {
        //       //target: 'https://rwk.cmicrwx.cn/rwx/rwkweb/',
        //       target: 'http://192.168.12.63:8897/',
        //       changeOrigin: true,
        //       pathRewrite: {
        //         '^/api': '' //代理的路径
        //       }
        //     },
        //   },
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};