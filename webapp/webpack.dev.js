const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        devMiddleware: {
            writeToDisk: (filePath) => {
                return !(/hot-update\.(js|json)$/.test(filePath));
            },
        },
        static: {
            directory: path.join(__dirname, '/public'),
        }
    },
    //target: 'web',
    devtool: 'inline-source-map',
    /*stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }*/
});