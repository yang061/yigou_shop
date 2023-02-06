const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //去除map文件
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      //url里面包含了/api字段，就启动代理服务器
      '/api': {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
  },
})
