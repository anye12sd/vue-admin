const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { IgnorePlugin } = require('webpack');
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ;
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
const configureWebpack = {
    externals: {
        'vue': 'Vue',
        'axios': 'axios',
        'vue-clipboard2': 'VueClipboard',
        'moment': 'moment',
        'ant-design-vue': 'antDesignVue'
    },
    plugins: [
        // Ignore all locale files of moment.js
        new IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
        alias: {
            // 只引入部分用到的图标，减少打包体积
            '@ant-design/icons/lib/dist$': resolve('./src/utils/icons.js'),
            // 解决本地化时间的显示的问题
            moment$: 'moment/moment.js'
        }
    }
};

if (isProduction) {
    configureWebpack.plugins.push(
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            minRatio: 0.8
        })
    );
}
module.exports = {
    productionSourceMap: false,
    configureWebpack,
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
        },
    }
}