const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        // target是目标请求URL
        target: 'http://gmall-h5-api.atguigu.cn',
        // 这里是路径重写，相当于request中的baseURL。
        // pathRewrite: {}
      }
    }
  }
})
