const path = require('path')
const webpack = require('webpack')
const ROOT_PATH = path.resolve(__dirname)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 分离css 
const fs = require('fs')
function resolve (dir) {
    return path.join(__dirname, dir)
}
console.log(123)
// fs.readdir(path.resolve(__dirname,'src'),function(err,files){
//     if (err) {
//         throw err
//     }
//     console.log(files)
// })
let files = fs.readdirSync(path.resolve(__dirname,'src'))
let mainPath = {}
files.map((item, index) => {
    var curPath = path.resolve(__dirname,'src', item)
    var objName = item.replace('.js','')
    if(!fs.statSync(curPath).isDirectory()) {
        Object.assign(mainPath, {[objName]: curPath})
    }
})
module.exports = {
    // [path.resolve(ROOT_PATH, 'src/main.js'), path.resolve(ROOT_PATH, 'src/main1.js')]
    entry: mainPath,
    output: {
        path:path.resolve(__dirname,'dist'),
        // filename: 'bundle.js'
        filename: './js/[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        inline: true,
        hot: true,
        port: 8090
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            // {
            //     test: /\.css$/,
            //     // loader: 'style-loader!css-loader'
            //     // use:ExtractTextWebpackPlugin.extract({
            //     //     fallback:'style-loader',
            //     //     use:['css-loader']
            //     // })
            //     use: ExtractTextWebpackPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     })
            // },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.scss$/,
                use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    // options: {
                    //     sourceMap: true, modules: true,
                    //     localIdentName: '[local]_[hash:base64:5]'
                    // }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                    sourceMap: true,
                    config: {
                        path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                    }
                    }
                },
                {
                    loader: 'sass-loader', options: { sourceMap: true }
                }
                ]
            }
            // {
            //     test: /\.(scss|sass|css)$/,
            //     loader: ExtractTextWebpackPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader"})
            //     // use: ExtractTextWebpackPlugin.extract({
            //     //     fallback: "style-loader",
            //     //     use:['css-loader','sass-loader']
            //     // })
            // }
        ]
    },
    // postcss: [
    //     require('autoprefixer') //调用autoprefixer插件,加入各个浏览器的前缀
    // ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new ExtractTextWebpackPlugin('./css/[name].css') // css分离插件
    ],
}