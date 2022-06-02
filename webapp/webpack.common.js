const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.jsx')
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options:{
                presets: ['@babel/react', '@babel/preset-env']
            }
        }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, '../server/static/dist'),
        //filename: 'bundle.js',
        filename: '[name].bundle.js',
        //path: path.resolve(__dirname, '../server/static/dist'),
        //publicPath: '/static/dist/',
        //chunkFilename: '[name].bundle.js',
    },
};