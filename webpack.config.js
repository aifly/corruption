/**
 * Created by fly on 2016/12/14.
 */


var config = {
    entry: {
        'index': "./index.jsx"
    },
    output: {
        publickPath: './assets/js',
        path: './assets/js',
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
    },
    module: {
        loaders: [{
            test: /\.jsx|\.js|\.es6$/,
            exclude: /node_modules/,
            loaders: ['babel']
        },
            {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }]
    },

}

module.exports = config;