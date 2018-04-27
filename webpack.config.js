const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js", // 入口文件
    output: {
        path: __dirname + "/build", // 打包后文件存放的地方
        filename: "bundle.js" // 打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./build", // 本地服务加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: [
                    {
                        loader: "babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0"
                    },{
                        loader: "eslint-loader",
                        options: {
                            fix: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            module: true, // 指定启用css module
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new ExtractTextPlugin("style.css")
    ],
};




