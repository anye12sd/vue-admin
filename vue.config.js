module.exports = {
    //axios域代理，解决axios跨域问题
    devServer: {
        proxy: {
            '/api': {
                target: 'http://i.jihui88.com/v4',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}