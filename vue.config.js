// const proxyConfig =
//   process.env.NODE_ENV === "production"
//     ? require("./proxy.pro.config")
//     : require("./proxy.dev.config");


module.exports = {
    assetsDir: "static",
    runtimeCompiler: true,
    devServer: {
        host: "0.0.0.0",
        // 端口号
        port: 8080,
        https: false,
        // https:{type:Boolean}
        //配置自动启动浏览器
        open: true,
        //热更新
        hot: true,
        //配置多个跨域  如果遇到options.proxy should be {Object|Array}错误,将改为  proxy:null
        proxy: { }
        // proxy: proxyConfig.proxyList,
    },
};