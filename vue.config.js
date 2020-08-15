module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? ''
        : process.env.NODE_ENV === 'test' ? '' : '/',
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? ''
    //     : '/',
    // axios域代理，解决axios跨域问题
    devServer: {
        proxy: {
            '/v4': {
                target: 'http://i.jihui88.com/v4',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/v4': ''
                }
            },
            '/admin/pc': {
                target: 'http://i.jihui88.com/v4',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/admin/pc': ''
                }
            }
        },
    }
}